'use strict';

const expectedConverted = {
  empty: {
    message: 'can handle empty line',
    md: '',
    html: '<p>\n</p>\n',
    ansi: '\n'
  },
  bold: {
    message: 'can handle bold',
    md: '**this is bold**',
    html: '<p>\n<b>this is bold</b>\n</p>\n',
    ansi: '\n\x1b[1mthis is bold\x1b[0m\n'
  },
  italic: {
    message: 'can handle italic',
    md: '_this is italic_',
    html: '<p>\n<i>this is italic</i>\n</p>\n',
    ansi: '\n\x1b[3mthis is italic\x1b[0m\n'
  },
  monospaced: {
    message: 'can handle monospaced',
    md: '`this is monospaced`',
    html: '<p>\n<tt>this is monospaced</tt>\n</p>\n',
    ansi: '\n\x1b[0;2mthis is monospaced\x1b[0m\n'
  },
  preformatted: {
    message: 'can handle preformatted',
    md: '```\nthis is preformatted text\n\nthat is **not** affected by anything\n```',
    html: '<p>\n<pre>\nthis is preformatted text\n\nthat is **not** affected by anything\n</pre>\n</p>\n',
    ansi: '\n\x1b[0;2mthis is preformatted text\n\nthat is **not** affected by anything\n\x1b[0m'
  },
  snakeCase: {
    message: 'does not transform snake case into italic',
    md: 'snake_case',
    html: '<p>\nsnake_case\n</p>\n',
    ansi: '\nsnake_case\n'
  },
  singleSquizedAsterisk: {
    message: 'transforms text with squized asterisk into bold if surrounded by bold tags',
    md: '**single**asterisk**',
    html: '<p>\n<b>single**asterisk</b>\n</p>\n',
    ansi: '\n\x1b[1msingle**asterisk\x1b[0m\n'
  },
  singleSquizedBacktick: {
    message: 'transforms text with squized backtick into monospaced if surrounded by monospace tags',
    md: '`single`backtick`',
    html: '<p>\n<tt>single`backtick</tt>\n</p>\n',
    ansi: '\n\x1b[0;2msingle`backtick\x1b[0m\n'
  },
  italicSnakeCase: {
    message: 'transforms snake case into italic if surrounded by italic tags',
    md: '_snake_case_',
    html: '<p>\n<i>snake_case</i>\n</p>\n',
    ansi: '\n\x1b[3msnake_case\x1b[0m\n'
  },
  singleAsterisk: {
    message: 'does not consider single asterisk as bold',
    md: 'single ** asterisk',
    html: '<p>\nsingle ** asterisk\n</p>\n',
    ansi: '\nsingle ** asterisk\n'
  },
  singleUnderscore: {
    message: 'does not consider single underscore italic',
    md: 'single _ underscore',
    html: '<p>\nsingle _ underscore\n</p>\n',
    ansi: '\nsingle _ underscore\n'
  },
  singleBacktick: {
    message: 'does not consider single backtick monospaced',
    md: 'single ` backtick',
    html: '<p>\nsingle ` backtick\n</p>\n',
    ansi: '\nsingle ` backtick\n'
  },
  singleNestedAsterisk: {
    message: 'considers single nested in itself asterisk as bold',
    md: '**single ** asterisk**',
    html: '<p>\n<b>single ** asterisk</b>\n</p>\n',
    ansi: '\n\x1b[1msingle ** asterisk\x1b[0m\n'
  },
  singleNestedUnderscore: {
    message: 'considers single nested in itself underscore as italic',
    md: '_single _ underscore_',
    html: '<p>\n<i>single _ underscore</i>\n</p>\n',
    ansi: '\n\x1b[3msingle _ underscore\x1b[0m\n'
  },
  singleNestedBacktick: {
    message: 'considers single nested in itself backtick as monospaced',
    md: '`single ` backtick`',
    html: '<p>\n<tt>single ` backtick</tt>\n</p>\n',
    ansi: '\n\x1b[0;2msingle ` backtick\x1b[0m\n'
  },
  standaloneUndWrapped: {
    message: 'standalone wrapped tag is not dublicated',
    md: 'standalone `_` _`_ **_** **`** wrapped',
    html: '<p>\nstandalone <tt>_</tt> <i>`</i> <b>_</b> <b>`</b> wrapped\n</p>\n',
    ansi: '\nstandalone \x1b[0;2m_\x1b[0m \x1b[3m`\x1b[0m \x1b[1m_\x1b[0m \x1b[1m`\x1b[0m wrapped\n'
  },
  trippleBoldTag: {
    message: 'triple bold tag is handled correctly',
    md: '******',
    html: '<p>\n<b>**</b>\n</p>\n',
    ansi: '\n\x1b[1m**\x1b[0m\n'
  },
  trippleItalicTag: {
    message: 'triple italic tag is handled correctly',
    md: '___',
    html: '<p>\n<i>_</i>\n</p>\n',
    ansi: '\n\x1b[3m_\x1b[0m\n'
  },
  trippleMonospacedTag: {
    message: 'triple monospaced tag is handled correctly',
    md: 'Hey ``` tripple',
    html: '<p>\nHey <tt>`</tt> tripple\n</p>\n',
    ansi: '\nHey \x1b[0;2m`\x1b[0m tripple\n'
  }
}

module.exports = { expectedConverted };
