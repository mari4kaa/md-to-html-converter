'use strict';

const pckg = require('../package.json');
const { program } = require('commander');

program
  .name('md-to-html-converter')
  .version(pckg.version)
  .argument('<mdFilePath>', 'Provide the path to markdown file')
  .option('-o, --out <outputFile>', 'Provide the output file for HTML');

program.parse();

module.exports = {
  args: program.args,
  options: program.opts()
};
