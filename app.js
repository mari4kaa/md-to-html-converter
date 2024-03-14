'use strict';

const fs = require('fs').promises;
const { args, options } = require('./config/commander');
const { Converter } = require('./Converter');
const { Validator } = require('./Validator');
const { PathManager } = require('./PathManager');

class App {
  constructor (args, options) {
    this.filePaths = args;
    this.options = options;
    this.output = '';
    this.converter = new Converter(this.options.format);
    this.validator = new Validator();
    this.pathManager = new PathManager();
  }

  async start () {
    try {
      for (const filePath of this.filePaths) {
        await this.pathManager.validateMdFilepath(filePath);

        const markdown = await fs.readFile(filePath, 'utf-8');
        this.output += this.converter.convertMd(markdown, this.validator.validateMdContent.bind(this.validator));
      }

      if (this.options.out) {
        this.pathManager.validateOutputPath(this.options.out);
        await fs.writeFile(this.options.out, this.output, 'utf-8');
      } else {
        console.log(this.output);
      }
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
}

const app = new App(args, options);
(async function () {
  app.start();
})();
