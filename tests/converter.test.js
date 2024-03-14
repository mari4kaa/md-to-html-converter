'use strict';

const { Converter } = require('../Converter');
const { expectedConverted } = require('./expected');

const testConverted = (format) => {
  for(const [, expObj] of Object.entries(expectedConverted)) {
    const converter = new Converter(format);
    const expOutput = format === 'html' ? expObj.html : expObj.ansi;

    test(expObj.message, () => {
      expect(converter.convertMd(expObj.md, () => {})).toBe(expOutput);
    });
  }
}

describe('converts into HTML correctly', () => {
  testConverted('html');  
});

describe('converts into ANSI correctly', () => {
  testConverted('ansi');  
});

describe('identifies unclosed preformatted tag', () => {

  test('finds unclosed preformatted tag in HTML', () => {
    const converter = new Converter('html');
    const mdInput = '```'
    expect(() => converter.convertMd(mdInput)).toThrow('Unclosed preformatted tag was found');
  });

  test('finds unclosed preformatted tag in ANSI', () => {
    const converter = new Converter('ansi');
    const mdInput = '```'
    expect(() => converter.convertMd(mdInput)).toThrow('Unclosed preformatted tag was found');
  })

});
