'use strict';

const { tags } = require('./config/constants');

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

        for (let i = 0; i < openChars.length; i++) {
          const openCharIdx = openChars[i].index;
          const closeCharIdx = closeChars[i].index + closeChars[i][0].trim().length;

          const content = line.substring(openCharIdx + mdTag.length, closeCharIdx - mdTag.length);

          for (const nestedTag of this.mdTags) {
            const nestedCharEnds = this.findFormattedEnds(content, nestedTag);

            if (nestedCharEnds.length) {
              throw new Error(`Nested tags were found "${nestedTag}" inside "${mdTag}"`);
            }
          }
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
