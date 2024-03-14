'use strict';

const { tags } = require('./config/constants');
const { getTagsNeighbours } = require('./config/getTagsNeighbours');

class Converter {
  constructor (format) {
    this.convertedLine = '';
    this.inPreformattedText = false;
    this.inParagraph = false;
    this.formatTags = {};
    if (format === 'html') {
      Object.entries(tags).forEach(([name, tag]) => {
        this.formatTags[name] = { md: tag.md, open: tag.html.open, close: tag.html.close };
      });
    } else {
      Object.entries(tags).forEach(([name, tag]) => {
        this.formatTags[name] = { md: tag.md, open: tag.ansi.open, close: tag.ansi.close };
      });
    }
  }

  convertMd (markdown, validateFunc) {
    const lines = markdown.split('\n');

    for (const line of lines) {
      if (line.trim() === this.formatTags.preformatted.md) {
        this.handlePreformattedStart();
      } else if (this.inPreformattedText) {
        this.convertedLine += `${line}\n`;
      } else if (line.trim() === '') {
        this.handleParagraph();
      } else {
        if (validateFunc) validateFunc(line);
        this.handleRegularLine(line);
      }
    }

    if (this.inPreformattedText) throw new Error('Unclosed preformatted tag was found');
    if (this.inParagraph) {
      this.convertedLine += this.formatTags.paragraph.close;
      this.inParagraph = false;
    }

    return this.convertedLine;
  }

  handleRegularLine (line) {
    this.handleParagraphStart();
    this.convertedLine += this.replaceFormattingTags(line) + '\n';
  }

  replaceFormattingTags (line) {
    let currentLine = line;
    for (const [, tagObj] of Object.entries(this.formatTags)) {
      if (tagObj.md === '\n' | tagObj.md === '```') continue;

      currentLine = this.replaceSameTags(currentLine, tagObj);
    }

    return currentLine;
  }

  replaceSameTags (line, tagObj) {
    const { openChars, closeChars } = getTagsNeighbours(line, tagObj.md);
    if (!openChars.length) return line;

    const openChar = openChars[0][0];

    const openCharIdx = openChars[0].index;
    const closeCharIdx = closeChars[0].index;

    const beforeTags = line.slice(0, openCharIdx + openChar.indexOf(tagObj.md));
    const betweenTags = line.slice(openCharIdx + openChar.indexOf(tagObj.md) + tagObj.md.length, closeCharIdx + 1);
    const afterTags = line.slice(closeCharIdx + tagObj.md.length + 1);

    line = beforeTags + tagObj.open + betweenTags + tagObj.close + afterTags;
    return this.replaceSameTags(line, tagObj);
  }

  handlePreformattedStart () {
    this.handleParagraphStart();
    this.convertedLine += this.inPreformattedText ? this.formatTags.preformatted.close : this.formatTags.preformatted.open;
    this.inPreformattedText = !this.inPreformattedText;
  }

  handleParagraphStart () {
    if (!this.inParagraph) {
      this.convertedLine += this.formatTags.paragraph.open;
      this.inParagraph = true;
    }
  }

  handleParagraph () {
    if (this.inParagraph) {
      this.convertedLine += this.formatTags.paragraph.close;
      this.inParagraph = false;
    } else {
      this.handleParagraphStart();
    }
  }
}

module.exports = { Converter };
