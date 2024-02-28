'use strict';

const { program } = require('commander');
const fs = require('fs');

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

const convertMd = (data) => {

}
