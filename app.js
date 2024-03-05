'use strict';

const fs = require('fs');
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

  start () {
    for (const filePath of this.filePaths) {
      if (filePath.endsWith('.html')) continue;

      try {
        fs.accessSync(filePath);
      } catch (err) {
        console.error(`Error: The file "${filePath}" does not exist.`);
        process.exit(1);
      }

      const markdown = fs.readFileSync(filePath, 'utf-8');

      try {
        this.validator.validateMdContent(markdown);
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
      this.html += this.converter.convertMd(markdown);
    }

    if (this.options.out) {
      fs.writeFileSync(this.options.out, this.html, 'utf-8');
    } else {
      console.log(this.html);
    }
  }
}

const app = new App(args, options);
app.start();
