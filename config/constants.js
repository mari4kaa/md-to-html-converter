'use strict';

const tags = {
  bold: {
    md: '**',
    html: { open: '<b>', close: '</b>' },
    ansi: { open: '\x1b[1m', close: '\x1b[0m' }
  },
  italic: {
    md: '_',
    html: { open: '<i>', close: '</i>' },
    ansi: { open: '\x1b[3m', close: '\x1b[0m' }
  },
  monospaced: {
    md: '`',
    html: { open: '<tt>', close: '</tt>' },
    ansi: { open: '\x1b[7m', close: '\x1b[m' }
  },
  preformatted: {
    md: '```',
    html: { open: '<pre>\n', close: '</pre>\n' },
    ansi: { open: '\x1b[7m', close: '\x1b[m' }
  },
  paragraph: {
    md: '\n',
    html: { open: '<p>\n', close: '</p>\n' },
    ansi: { open: '\n', close: '' }
  }
};

const regexps = {
  openFirst: '(?:\\s|^)',
  openSecond: '[^\\s]',
  closeFirst: '[^\\s]',
  closeSecond: '(?:\\s|$)'
};

const inputExtensions = ['.md'];

const outputExtensions = ['.html', '.txt'];

module.exports = { tags, regexps, inputExtensions, outputExtensions };
