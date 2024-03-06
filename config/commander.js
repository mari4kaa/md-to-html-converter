'use strict';

const pckg = require('../package.json');
const { program } = require('commander');

program
  .name('md-to-html-converter')
  .version(pckg.version)
  .argument('<mdFilePath>', 'Provide the path to markdown file')
  .option('-o, --out <HTMLfilepath>', 'Provide the path to output file');

program.parse();

module.exports = {
  args: program.args,
  options: program.opts()
};
