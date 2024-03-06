'use strict';

const fs = require('fs').promises;
const { args, options } = require('./config/commander');
const { Converter } = require('./Converter');
const { Validator } = require('./Validator');

class App {
  constructor (args, options) {
    this.filePaths = args;
    this.options = options;
    this.html = '';
    this.converter = new Converter();
    this.validator = new Validator();
  }

  async start () {
    for (const filePath of this.filePaths) {
      try {
        await this.validator.validateMdFilepath(filePath);
      } catch (err) {
        console.error(err);
        process.exit(1);
      }

      const markdown = await fs.readFile(filePath, 'utf-8');

      try {
        this.html += this.converter.convertMd(markdown, this.validator.validateMdContent.bind(this.validator));
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
    }

    if (this.options.out) {
      try {
        this.validator.validateOutputPath(this.options.out);
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
      await fs.writeFile(this.options.out, this.html, 'utf-8');
    } else {
      console.log(this.html);
    }
  }
}

const app = new App(args, options);
(async function () {
  app.start();
})();
