'use strict';

const { PathManager } = require('../PathManager');

describe('checks extensions of filepaths correctly', () => {
  test('.md extension is accepted as input', () => {
    const pathManager = new PathManager();
    expect(() => pathManager.checkExtension('./path/to/file.md', true)).not.toThrow();
  });

  test('not .md extensions are not accepted as input', () => {
    const pathManager = new PathManager();
    expect(() => pathManager.checkExtension('./path/to/file.js', true))
      .toThrow('The file "./path/to/file.js" has wrong extension. Only .md allowed');
  });

  test('.txt extension is accepted as output', () => {
    const pathManager = new PathManager();
    expect(() => pathManager.checkExtension('./path/to/file.txt', false)).not.toThrow();
  });

  test('.html extension is accepted as output', () => {
    const pathManager = new PathManager();
    expect(() => pathManager.checkExtension('./path/to/file.html', false)).not.toThrow();
  });

  test('not .html and .txt extensions are not accepted as output', () => {
    const pathManager = new PathManager();
    expect(() => pathManager.checkExtension('./path/to/file.png', false))
      .toThrow('The file "./path/to/file.png" has wrong extension. Only .html,.txt allowed');
  });
});
