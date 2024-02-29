'use strict';

class Converter {
  constructor () {
    this.html = '';
    this.inPreformattedText = false;
    this.inParagraph = false;
    this.regexps = {
      bold: /\*\*(.*?)\*\*/g,
      italic: /(?<!\w)(_)(\w+(?:\s+\w+)*)(_)(?!\w)/g,
      monospaced: /`(.*?)`/g
    };
  }

  convertMd = (markdown) => {
    this.markdown = markdown;

    const lines = markdown.split('\n');

    for (const line of lines) {
      if (line.trim() === '```') {
        this.html += this.inPreformattedText ? '</pre>\n' : '<pre>\n';
        this.inPreformattedText = !this.inPreformattedText;
      } else if (this.inPreformattedText) {
        this.html += `${line}\n`;
      } else if (line.trim() === '') {
        if (this.inParagraph) {
          this.html += '</p>\n';
          this.inParagraph = false;
        }
      } else {
        if (!this.inParagraph) {
          this.html += '<p>';
          this.inParagraph = true;
        }

        let currentLine = line;
        currentLine = currentLine.replace(this.regexps.bold, '<b>$1</b>');
        currentLine = currentLine.replace(this.regexps.italic, '<i>$2</i>');
        currentLine = currentLine.replace(this.regexps.monospaced, '<tt>$1</tt>');

        this.html += currentLine + '\n';
      }
    }

    if (this.inParagraph) {
      this.html += '</p>\n';
    }

    return this.html;
  };
};

module.exports = { Converter };
