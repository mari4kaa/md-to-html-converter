'use strict';

const fs = require('fs').promises;
const path = require('path');
const { regexps, tags, inputExtensions, outputExtensions } = require('./config/constants');

class Validator {
  constructor () {
    this.isValidFilepath = true;
    this.inPreformattedText = false;
    this.mdTags = Object.entries(tags).map(([, mdTag]) => mdTag.md);
    this.isClosedRegexps = Object.entries(regexps).map(([, regexp]) => regexp);
  }

  async validateMdFilepath (mdFilePath) {
    await this.checkAccess(mdFilePath);
    this.checkExtension(mdFilePath, true);
  }

  validateOutputPath (filePath) {
    this.checkExtension(filePath, false);
  }

  async checkAccess (mdFilePath) {
    try {
      await fs.access(mdFilePath);
    } catch (err) {
      throw new Error(`Error: The file "${mdFilePath}" does not exist.`);
    }
  }

  checkExtension (filePath, isInput) {
    const ext = path.extname(filePath);
    const valid = isInput ? inputExtensions.includes(ext) : outputExtensions.includes(ext);
    const allowedExtensions = isInput ? inputExtensions : outputExtensions;
    if (!valid) {
      throw new Error(`Error: The file "${filePath}" has wrong extension. Only ${allowedExtensions} allowed`);
    }
  }

  validateMdContent (line) {
    for (const mdTag of this.mdTags) {
      const { openChars, closeChars } = this.findFormattedEnds(line, mdTag);
      if (!openChars.length && !closeChars.length) continue;
      else if (openChars.length !== closeChars.length) {
        throw new Error(`Unclosed tag ${mdTag} was found`);
      }

      this.checkNested(line, mdTag, { openChars, closeChars });
    }
  }

  checkNested (line, primaryTag, formattedEnds) {
    const { openChars, closeChars } = formattedEnds;
    for (let i = 0; i < openChars.length; i++) {
      const openCharIdx = openChars[i].index;
      const closeCharIdx = closeChars[i].index + closeChars[i][0].trim().length;

      const content = line.substring(openCharIdx + primaryTag.length, closeCharIdx - primaryTag.length);

      for (const regexp of this.isClosedRegexps) {
        const isNested = content.match(regexp);
        if (isNested) {
          throw new Error(`Nested tags were found: ${line}`);
        }
      }
    }
  }

  findFormattedEnds (line, mdTag) {
    const pattern = this.getRegexp(mdTag);

    const matchedFirst = line.matchAll(new RegExp(pattern.openChar, 'g'));
    const matchedLast = line.matchAll(new RegExp(pattern.closeChar, 'g'));
    const firstChars = matchedFirst ? [...matchedFirst] : [];
    const lastChars = matchedLast ? [...matchedLast] : [];

    return {
      openChars: firstChars,
      closeChars: lastChars
    };
  }

  getRegexp (mdTag) {
    const shortenedTag = mdTag[0];

    const escShortened = `\\${shortenedTag}`;
    const escaped = mdTag.replace(new RegExp(escShortened, 'g'), escShortened);

    return {
      openChar: `(?:\\s|^)${escaped}[^\\s]`,
      closeChar: `[^\\s]${escaped}(?:\\s|$)`
    };
  }
}

module.exports = { Validator };
