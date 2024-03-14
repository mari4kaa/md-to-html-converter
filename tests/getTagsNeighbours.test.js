'use strict';

const { getTagsNeighbours } = require('../config/getTagsNeighbours');

describe('correctly finds tag`s surroundings', () => {
  test('finds surroundings of tags', () => {
    const mdLine = 'Simple `string`';
    const mdTag = '`';
    expect(getTagsNeighbours(mdLine, mdTag).openChars[0][0]).toBe(' `s');
    expect(getTagsNeighbours(mdLine, mdTag).closeChars[0][0]).toBe('g`');
    expect(getTagsNeighbours(mdLine, mdTag).openChars[0].index).toBe(6);
    expect(getTagsNeighbours(mdLine, mdTag).closeChars[0].index).toBe(13);
  });

  test('returns empty arrays when tag was not found', () => {
    const mdLine = 'No tags are there';
    const mdTag = '_';
    expect(getTagsNeighbours(mdLine, mdTag)).toEqual({ openChars: [], closeChars: [] });
  });
});
