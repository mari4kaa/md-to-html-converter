'use strict';

const { regexps } = require('./constants');

function getTagsNeighbours (line, mdTag) {
  const pattern = getRegexps(mdTag);

  const matchedFirst = line.matchAll(new RegExp(pattern.openChar, 'g'));
  const matchedLast = line.matchAll(new RegExp(pattern.closeChar, 'g'));

  return {
    openChars: [...matchedFirst] || [],
    closeChars: [...matchedLast] || []
  };
}

function getRegexps (mdTag) {
  const escShortened = `\\${mdTag[0]}`;
  const escaped = mdTag.replace(new RegExp(escShortened, 'g'), escShortened);

  return {
    openChar: `${regexps.openFirst}${escaped}${regexps.openSecond}`,
    closeChar: `${regexps.closeFirst}${escaped}${regexps.closeSecond}`
  };
}

module.exports = { getTagsNeighbours };
