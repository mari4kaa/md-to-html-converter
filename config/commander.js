'use strict';

const pckg = require('../package.json');
const { Command, Option } = require('commander');

const program = new Command();

program
  .name('md-to-html-converter')
  .version(pckg.version)
  .argument('<mdFilePath>', 'Provide the path to markdown file')
  .option('-o, --out <outputPath>', 'Provide the path to output file')
  .addOption(
    new Option('-f, --format <format>', 'Provide the output option').choices([
      'ansi',
      'html'
    ])
  ).action((_, opts) => {
    if (!opts.format) opts.format = opts.out ? 'html' : 'ansi';
    console.log(opts.format);
  });

program.parse();

module.exports = {
  args: program.args,
  options: program.opts()
};
