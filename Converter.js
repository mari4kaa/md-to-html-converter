'use strict';

const { tagsHtml, tagsAnsi, regexps } = require('./config/constants');

class Converter {
  constructor (options) {
    this.html = '';
    this.inPreformattedText = false;
    this.inParagraph = false;
    this.tags = options.format === 'html' ? tagsHtml : tagsAnsi;
  }

  convertMd (markdown, validateFunc) {
    this.markdown = markdown;
    const lines = markdown.split('\n');

    for (const line of lines) {
      if (line.trim() === this.tags.preformatted.md) {
        this.handlePreformattedStart();
      } else if (this.inPreformattedText) {
        this.html += `${line}\n`;
      } else if (line.trim() === '') {
        validateFunc(line);
        this.handleParagraphEnd();
      } else {
        validateFunc(line);
        this.handleRegularLine(line);
      }
    }

    if (this.inParagraph) this.html += this.tags.paragraph.close;

    return this.html;
  }

  handlePreformattedStart () {
    this.handleParagraphStart();
    this.html += this.inPreformattedText ? this.tags.preformatted.close : this.tags.preformatted.open;
    this.inPreformattedText = !this.inPreformattedText;
  }

  handleParagraphStart () {
    if (!this.inParagraph) {
      this.html += this.tags.paragraph.open;
      this.inParagraph = true;
    }
  }

  handleParagraphEnd () {
    if (this.inParagraph) {
      this.html += this.tags.paragraph.close;
      this.inParagraph = false;
    }
  }

  handleRegularLine (line) {
    this.handleParagraphStart();
    const htmlLine = this.replaceFormattingTags(line) + '\n';
    this.html += htmlLine;
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
