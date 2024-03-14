'use strict';

const expectedConverted = {
  empty: {
    message: 'can handle empty line',
    md: '',
    html: '<p>\n</p>\n',
    ansi: '\n'
  },
  paragraph: {
    message: 'can handle paragraphs',
    md: 'paragraph1\nstill paragraph1\n\nparagraph2',
    html: '<p>\nparagraph1\nstill paragraph1\n</p>\n<p>\nparagraph2\n</p>\n',
    ansi: '\nparagraph1\nstill paragraph1\n\nparagraph2\n'
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
    ansi: '\n\x1b[7mthis is monospaced\x1b[m\n'
  },
  preformatted: {
    message: 'can handle preformatted',
    md: '```\nthis is preformatted text\n\nthat is **not** affected by anything\n```',
    html: '<p>\n<pre>\nthis is preformatted text\n\nthat is **not** affected by anything\n</pre>\n</p>\n',
    ansi: '\n\x1b[7mthis is preformatted text\n\nthat is **not** affected by anything\n\x1b[m'
  },
  snakeCase: {
    message: 'does not transform snake case into italic',
    md: 'snake_case',
    html: '<p>\nsnake_case\n</p>\n',
    ansi: '\nsnake_case\n'
  },
  singleSquizedAsterisk: {
    message: 'transforms text with squized in text asterisks into bold if surrounded by bold tags',
    md: '**single**asterisk**',
    html: '<p>\n<b>single**asterisk</b>\n</p>\n',
    ansi: '\n\x1b[1msingle**asterisk\x1b[0m\n'
  },
  singleSquizedBacktick: {
    message: 'transforms text with squized in text backtick into monospaced if surrounded by monospace tags',
    md: '`single`backtick`',
    html: '<p>\n<tt>single`backtick</tt>\n</p>\n',
    ansi: '\n\x1b[7msingle`backtick\x1b[m\n'
  },
  italicSnakeCase: {
    message: 'transforms snake case into italic if surrounded by italic tags',
    md: '_snake_case_',
    html: '<p>\n<i>snake_case</i>\n</p>\n',
    ansi: '\n\x1b[3msnake_case\x1b[0m\n'
  },
  singleAsterisk: {
    message: 'does not transform standalone bold tag into bold',
    md: 'single ** asterisk',
    html: '<p>\nsingle ** asterisk\n</p>\n',
    ansi: '\nsingle ** asterisk\n'
  },
  singleUnderscore: {
    message: 'does not transform standalone underscore tag into italic',
    md: 'single _ underscore',
    html: '<p>\nsingle _ underscore\n</p>\n',
    ansi: '\nsingle _ underscore\n'
  },
  singleBacktick: {
    message: 'does not transform standalone backtick into monospaced',
    md: 'single ` backtick',
    html: '<p>\nsingle ` backtick\n</p>\n',
    ansi: '\nsingle ` backtick\n'
  },
  singleNestedAsterisk: {
    message: 'standalone bold tag nested in itself does not affect primary tag`s effect',
    md: '**single ** asterisk**',
    html: '<p>\n<b>single ** asterisk</b>\n</p>\n',
    ansi: '\n\x1b[1msingle ** asterisk\x1b[0m\n'
  },
  singleNestedUnderscore: {
    message: 'standalone italic tag nested in itself does not affect primary tag`s effect',
    md: '_single _ underscore_',
    html: '<p>\n<i>single _ underscore</i>\n</p>\n',
    ansi: '\n\x1b[3msingle _ underscore\x1b[0m\n'
  },
  singleNestedBacktick: {
    message: 'standalone monospace tag nested into itself does not affect primary tag`s effect',
    md: '`single ` backtick`',
    html: '<p>\n<tt>single ` backtick</tt>\n</p>\n',
    ansi: '\n\x1b[7msingle ` backtick\x1b[m\n'
  },
  standaloneUndWrapped: {
    message: 'standalone wrapped tag is not dublicated',
    md: 'standalone `_` _`_ **_** **`** wrapped',
    html: '<p>\nstandalone <tt>_</tt> <i>`</i> <b>_</b> <b>`</b> wrapped\n</p>\n',
    ansi: '\nstandalone \x1b[7m_\x1b[m \x1b[3m`\x1b[0m \x1b[1m_\x1b[0m \x1b[1m`\x1b[0m wrapped\n'
  },
  tripleBoldTag: {
    message: 'triple bold tag is handled correctly',
    md: '******',
    html: '<p>\n<b>**</b>\n</p>\n',
    ansi: '\n\x1b[1m**\x1b[0m\n'
  },
  tripleItalicTag: {
    message: 'triple italic tag is handled correctly',
    md: '___',
    html: '<p>\n<i>_</i>\n</p>\n',
    ansi: '\n\x1b[3m_\x1b[0m\n'
  },
  tripleMonospacedTag: {
    message: 'triple monospaced tag is handled correctly',
    md: 'Hey ``` tripple',
    html: '<p>\nHey <tt>`</tt> tripple\n</p>\n',
    ansi: '\nHey \x1b[7m`\x1b[m tripple\n'
  },
  complexText: {
    message: 'can handle complex text',
    md: [
      'This is a **bold** word **and** this is **too**',
      'This is _italic_ text.',
      'This is `monospaced` `text.`\n',
      'This `hii`iii` should be valid.',
      'And this _hii _ iii_ should be valid too.',
      'snake_case should not be italicized.\n',
      '```\nThis text is **_preformatted_**\n',
      'And can have multiple paragraphs\n```'
    ].join('\n'),
    html: [
      '<p>\nThis is a <b>bold</b> word <b>and</b> this is <b>too</b>\n',
      'This is <i>italic</i> text.\n',
      'This is <tt>monospaced</tt> <tt>text.</tt>\n</p>\n',
      '<p>\nThis <tt>hii`iii</tt> should be valid.\n',
      'And this <i>hii _ iii</i> should be valid too.\n',
      'snake_case should not be italicized.\n</p>\n',
      '<p>\n<pre>\nThis text is **_preformatted_**\n\n',
      'And can have multiple paragraphs\n</pre>\n</p>\n',
    ].join(''),
    ansi: [
      '\nThis is a \x1b[1mbold\x1b[0m word \x1b[1mand\x1b[0m this is \x1b[1mtoo\x1b[0m\n',
      'This is \x1b[3mitalic\x1b[0m text.\n',
      'This is \x1b[7mmonospaced\x1b[m \x1b[7mtext.\x1b[m\n\n',
      'This \x1b[7mhii`iii\x1b[m should be valid.\n',
      'And this \x1b[3mhii _ iii\x1b[0m should be valid too.\n',
      'snake_case should not be italicized.\n\n',
      '\x1b[7mThis text is **_preformatted_**\n\nAnd can have multiple paragraphs\n\x1b[m',
    ].join('')
  }
}

const expectedValidated = {
  unfinishedOpenTag: {
    message: 'unfinished open tag is invalid',
    md: 'Unfinished **bold tag',
    errorMsg: 'Unfinished tag ** was found',
  },
  unfinishedCloseTag: {
    message: 'unfinished close tag is invalid',
    md: 'Unfinished monospace` tag',
    errorMsg: 'Unfinished tag ` was found',
  },
  unfinishedBothTags: {
    message: 'two unfinished tag is invalid',
    md: 'Unfinished italic_ _tags',
    errorMsg: 'Unfinished tag _ was found',
  },
  nestedTags: {
    message: 'finished nested tag is invalid',
    md: '`_this is invalid_`',
    errorMsg: 'Nested tags were found: `_this is invalid_`'
  },
  unfinishedNestedTag: {
    message: 'unfinished nested tag is invalid',
    md: 'Valid **nested _valid tag**',
    errorMsg: 'Unfinished tag _ was found',
  },
  standaloneNestedTag: {
    message: 'standalone nested tag is valid',
    md: '**single ** asterisk**',
    errorMsg: '',
  },
  singleSquizedTag: {
    message: 'single nested tag, which is surrounded by text, is valid',
    md: '`single`backtick`',
    errorMsg: ''
  }
}

module.exports = { expectedConverted, expectedValidated };
