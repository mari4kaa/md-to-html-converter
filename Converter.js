'use strict';

class Converter {
  constructor () {
    this.html = '';
    this.inPreformattedText = false;
    this.inParagraph = false;
  }

  convertMd = (markdown) => {
    this.markdown = markdown;

    const lines = markdown.split('\n');

    for (const line of lines) {
      if (line.trim() === '```') {
        this.inPreformattedText = !this.inPreformattedText;
        this.html += this.inPreformattedText ? '<pre>\n' : '</pre>\n';
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

        let processedLine = line;
        processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        processedLine = processedLine.replace(/(?<!\w)(_)(\w+(?:\s+\w+)*)(_)(?!\w)/g, '<i>$2</i>');
        processedLine = processedLine.replace(/`(.*?)`/g, '<tt>$1</tt>');

        this.html += processedLine + '\n';
      }
    }

    if (this.inParagraph) {
      this.html += '</p>\n';
    }

    return this.html;
  };
};

module.exports = { Converter };
