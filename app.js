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
      if (filePath.endsWith('.html')) continue;

      try {
        await fs.access(filePath);
      } catch (err) {
        console.error(`Error: The file "${filePath}" does not exist.`);
        process.exit(1);
      }

      const markdown = await fs.readFile(filePath, 'utf-8');

      try {
        this.validator.validateMdContent(markdown);
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
      this.html += this.converter.convertMd(markdown);
    }

    if (this.options.out) {
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
