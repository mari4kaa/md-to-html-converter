'use strict';

const { tagsHtml, tagsAnsi, regexps } = require('./config/constants');

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
        this.handleParagraphEnd();
      } else {
        validateFunc(line);
        this.handleRegularLine(line);
      }
    }

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

  handleParagraphEnd () {
    if (this.inParagraph) {
      this.convertedLine += this.tags.paragraph.close;
      this.inParagraph = false;
    }
  }

  handleRegularLine (line) {
    this.handleParagraphStart();
    this.convertedLine += this.replaceFormattingTags(line) + '\n';
  }

  replaceFormattingTags (line) {
    let currentLine = line;
    currentLine = currentLine.replace(regexps.bold, `${this.tags.bold.open}$1${this.tags.bold.close}`);
    currentLine = currentLine.replace(regexps.italic, `${this.tags.italic.open}$2${this.tags.italic.close}`);
    currentLine = currentLine.replace(regexps.monospaced, `${this.tags.monospaced.open}$1${this.tags.monospaced.close}`);

    return currentLine;
  }
}

module.exports = { Converter };
