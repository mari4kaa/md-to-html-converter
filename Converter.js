'use strict';

const { tags, regexps } = require('./config/constants');

class Converter {
  constructor () {
    this.html = '';
    this.inPreformattedText = false;
    this.inParagraph = false;
  }

  convertMd (markdown, validateFunc) {
    this.markdown = markdown;
    const lines = markdown.split('\n');

    for (const line of lines) {
      if (line.trim() === tags.preformatted.md) {
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

    if (this.inParagraph) this.html += '</p>\n';

    return this.html;
  }

  handlePreformattedStart () {
    this.handleParagraphStart();
    this.html += this.inPreformattedText ? `${tags.preformatted.close}\n` : `${tags.preformatted.open}\n`;
    this.inPreformattedText = !this.inPreformattedText;
  }

  handleParagraphStart () {
    if (!this.inParagraph) {
      this.html += '<p>\n';
      this.inParagraph = true;
    }
  }

  handleParagraphEnd () {
    if (this.inParagraph) {
      this.html += '</p>\n';
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
    currentLine = currentLine.replace(regexps.bold, `${tags.bold.open}$1${tags.bold.close}`);
    currentLine = currentLine.replace(regexps.italic, `${tags.italic.open}$2${tags.italic.close}`);
    currentLine = currentLine.replace(regexps.monospaced, `${tags.monospaced.open}$1${tags.monospaced.close}`);

    return currentLine;
  }
}

module.exports = { Converter };
