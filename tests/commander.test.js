'use strict';

process.argv.push('./path/to/input.md', './path/to/input2.md', '--out', './path/to/output.html', '--format', 'html');
const { args, options } = require('../config/commander');

describe('command line interface is correct', () => {
  test('receives the paths to input files', () => {
    expect(args).toEqual(['./path/to/input.md', './path/to/input2.md']);
  });

  test('receives the path to output file', () => {
    expect(options.out).toBe('./path/to/output.html');
  });

  test('receives the format of output', () => {
    expect(options.format).toBe('html');
  });
});
