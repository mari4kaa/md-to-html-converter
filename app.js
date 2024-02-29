'use strict';

const { program } = require('commander');
const fs = require('fs');

const convertMd = (markdown) => {
  let html = '';
  let inPreformattedText = false;
  let inParagraph = false;

  const lines = markdown.split('\n');

  for (const line of lines) {
    if (line.trim() === '```') {
      inPreformattedText = !inPreformattedText;
      html += inPreformattedText ? '<pre>\n' : '</pre>\n';
    } else if (inPreformattedText) {
      html += `${line}\n`;
    } else if (line.trim() === '') {
      if (inParagraph) {
        html += '</p>\n';
        inParagraph = false;
      }
    } else {
      if (!inParagraph) {
        html += '<p>';
        inParagraph = true;
      }

      let processedLine = line;
      processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      processedLine = processedLine.replace(/(?<!\w)(_)(\w+(?:\s+\w+)*)(_)(?!\w)/g, '<i>$2</i>');
      processedLine = processedLine.replace(/`(.*?)`/g, '<tt>$1</tt>');

      html += processedLine + '\n';
    }
  }

  if (inParagraph) {
    html += '</p>\n';
  }

  return html;
};

program
  .version('1.0.0')
  .arguments('<filePath>')
  .option('-o, --out <outputFile>', 'Provide the output file for HTML')
  .action((mdFilePath, options) => {
    if (!fs.existsSync(mdFilePath)) {
      console.error(`Error: The file "${mdFilePath}" does not exist.`);
      process.exit(1);
    }

    const markdown = fs.readFileSync(mdFilePath, 'utf8');
    const html = convertMd(markdown);

    if (options.out) {
      fs.writeFileSync(options.out, html, 'utf8');
    } else {
      console.log(html);
    }
  });

program.parse(process.argv);
