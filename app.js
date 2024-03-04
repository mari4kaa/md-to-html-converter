'use strict';

const { program } = require('commander');
const fs = require('fs');
const pckg = require('./package.json');
const { Converter } = require('./Converter');
const { Validator } = require('./Validator');

class App {
  constructor (mdFilePath, options) {
    this.mdFilePath = mdFilePath;
    this.options = options;
    this.converter = new Converter();
    this.validator = new Validator();
  }

  start () {
    if (!fs.existsSync(this.mdFilePath)) {
      console.error(`Error: The file "${this.mdFilePath}" does not exist.`);
      process.exit(1);
    }

    const markdown = fs.readFileSync(this.mdFilePath, 'utf8');
    try {
      this.validator.validateMdContent(markdown);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }

    const html = this.converter.convertMd(markdown);

    if (this.options.out) {
      fs.writeFileSync(this.options.out, html, 'utf8');
    } else {
      console.log(html);
    }
  }
}

program
  .version(pckg.version)
  .arguments('<mdFilePath>')
  .option('-o, --out <outputFile>', 'Provide the output file for HTML')
  .action((mdFilePath, options) => {
    const app = new App(mdFilePath, options);
    app.start();
  });

program.parse(process.argv);
