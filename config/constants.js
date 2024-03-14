'use strict';

const tagsHtml = {
  bold: { md: '**', open: '<b>', close: '</b>' },
  italic: { md: '_', open: '<i>', close: '</i>' },
  monospaced: { md: '`', open: '<tt>', close: '</tt>' },
  preformatted: { md: '```', open: '<pre>\n', close: '</pre>\n' },
  paragraph: { md: '\n', open: '<p>\n', close: '</p>\n' }
};

const tagsAnsi = {
  bold: { md: '**', open: '\x1b[1m', close: '\x1b[0m' },
  italic: { md: '_', open: '\x1b[3m', close: '\x1b[0m' },
  monospaced: { md: '`', open: '\x1b[7m', close: '\x1b[m' },
  preformatted: { md: '```', open: '\x1b[7m', close: '\x1b[m' },
  paragraph: { md: '\n', open: '\n', close: '' }
};

const regexps = {
  openFirst: '(?:\\s|^)',
  openSecond: '[^\\s]',
  closeFirst: '[^\\s]',
  closeSecond: '(?:\\s|$)'
};

const inputExtensions = ['.md'];

const outputExtensions = ['.html', '.txt'];

module.exports = { tagsHtml, tagsAnsi, regexps, inputExtensions, outputExtensions };
