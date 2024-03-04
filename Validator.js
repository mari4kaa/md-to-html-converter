'use strict';

const { tags } = require('./constants');

class Validator {
  constructor () {
    this.isValidFilepath = true;
    this.inPreformattedText = false;
    this.mdTags = Object.entries(tags).map(([, mdTag]) => mdTag.md);
  }

  validateMdFilepath (mdFilePath) {

  }

  validateMdContent (markdown) {
    const lines = markdown.split('\n');

    for (const line of lines) {
      for (const mdTag of this.mdTags) {
        const { openChars, closeChars } = this.findFormattedEnds(line, mdTag);
        if (!openChars.length && !closeChars.length) continue;
        else if (openChars.length !== closeChars.length) {
          throw new Error(`Unclosed tag ${mdTag} was found`);
        }
      }
    }
  }

  validateNested (line) {

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
};

module.exports = { Validator };
