'use strict';

const { tagsHtml } = require('./config/constants');
const { getTagsNeighbours } = require('./config/getTagsNeighbours');

class Validator {
  constructor () {
    this.isValidFilepath = true;
    this.inPreformattedText = false;
    this.mdTags = Object.entries(tagsHtml).map(([, mdTag]) => mdTag.md);
  }

  validateMdContent (line) {
    for (const mdTag of this.mdTags) {
      const { openChars, closeChars } = getTagsNeighbours(line, mdTag);
      if (!openChars.length && !closeChars.length) continue;
      else if (openChars.length !== closeChars.length) {
        throw new Error(`Unfinished tag ${mdTag} was found`);
      }

      this.checkNested(line, mdTag, { openChars, closeChars });
    }
  }

  checkNested (line, primaryTag, formattedEnds) {
    const { openChars, closeChars } = formattedEnds;
    for (let i = 0; i < openChars.length; i++) {
      const openCharIdx = openChars[i].index;
      const closeCharIdx = closeChars[i].index + closeChars[i][0].length;

      if (closeChars[i].index < openCharIdx) throw new Error(`Unfinished tag ${primaryTag} was found`);

      const content = line.substring(openCharIdx, closeCharIdx).trim().slice(primaryTag.length, -primaryTag.length);
      if (content === '') throw new Error('Empty tags are not allowed');

      for (const secondaryTag of this.mdTags) {
        const { openChars: nestedOpened, closeChars: nestedClosed } = getTagsNeighbours(content, secondaryTag);
        const isNested = nestedOpened.length && nestedClosed.length && nestedOpened.length === nestedClosed.length;
        if (isNested) {
          throw new Error(`Nested tags were found: ${line}`);
        }
      }
    }
  }
}

module.exports = { Validator };
