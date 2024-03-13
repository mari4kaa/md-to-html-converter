'use strict';

const { tagsHtml, tagsAnsi } = require('./config/constants');
const { getFormattedEnds } = require('./config/getFormattedEnds')

class Converter {
  constructor (format) {
    this.convertedLine = '';
    this.inPreformattedText = false;
    this.inParagraph = false;
    this.tags = format === 'html' ? tagsHtml : tagsAnsi;
  }

  convertMd (markdown, validateFunc) {
    const lines = markdown.split('\n');

    for (const line of lines) {
      if (line.trim() === this.tags.preformatted.md) {
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

    if (this.inPreformattedText) throw new Error('Unclosed preformatted tag');
    if (this.inParagraph) this.convertedLine += this.tags.paragraph.close;

    return this.convertedLine;
  }

  handlePreformattedStart () {
    this.handleParagraphStart();
    this.convertedLine += this.inPreformattedText ? this.tags.preformatted.close : this.tags.preformatted.open;
    this.inPreformattedText = !this.inPreformattedText;
  }

  handleParagraphStart () {
    if (!this.inParagraph) {
      this.convertedLine += this.tags.paragraph.open;
      this.inParagraph = true;
    }
  }

  handleParagraph () {
    if (this.inParagraph) {
      this.convertedLine += this.tags.paragraph.close;
      this.inParagraph = false;
    } else {
      this.handleParagraphStart();
    }
  }

  handleRegularLine (line) {
    this.handleParagraphStart();
    this.convertedLine += this.replaceFormattingTags(line) + '\n';
  }

  replaceFormattingTags (line) {
    let currentLine = line;
    for (const [, tagObj] of Object.entries(this.tags)) {
      if(tagObj.md === '\n' | tagObj.md === '```') continue;

      currentLine = this.replaceSameTags(currentLine, tagObj);
    }

    return currentLine;
  }

  replaceSameTags(line, tagObj) {
    const { openChars, closeChars } = getFormattedEnds(line, tagObj.md);
    if(!openChars.length) return line;

    const openChar = openChars[0][0];

    const openCharIdx = openChars[0].index;
    const closeCharIdx = closeChars[0].index;

    const beforeTags = line.slice(0, openCharIdx + openChar.indexOf(tagObj.md));
    const betweenTags = line.slice(openCharIdx + openChar.indexOf(tagObj.md) + tagObj.md.length, closeCharIdx + 1);
    const afterTags = line.slice(closeCharIdx + tagObj.md.length + 1);

    line = beforeTags + tagObj.open + betweenTags + tagObj.close + afterTags;
    return this.replaceSameTags(line, tagObj);
  }
}

module.exports = { Converter };
