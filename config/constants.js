'use strict';

const tags = {
  bold: { md: '**', open: '<b>', close: '</b>' },
  italic: { md: '_', open: '<i>', close: '</i>' },
  monospaced: { md: '`', open: '<tt>', close: '</tt>' },
  preformatted: { md: '```', open: '<pre>', close: '</pre>' }
};

const regexps = {
  bold: /\*\*(.*?)\*\*/g,
  italic: /(?<!\w)(_)(\w+(?:\s+\w+)*)(_)(?!\w)/g,
  monospaced: /`(.*?)`/g
};

module.exports = { tags, regexps };
