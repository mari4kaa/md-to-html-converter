'use strict';

const { Validator } = require('../Validator');
const { expectedValidated } = require('./expected');

describe('validates markdown content correctly', () => {
  for(const [, expObj] of Object.entries(expectedValidated)) {
    const validator = new Validator();

    if(expObj.errorMsg !== '') {
      test(expObj.message, () => {
        expect(() => validator.validateMdContent(expObj.md)).toThrow(expObj.errorMsg);
      });
    } else {
      test(expObj.message, () => {
        expect(() => validator.validateMdContent(expObj.md)).not.toThrow();
      });
    }
  }
});
