// import React from 'react';
import App from '../src/components/App';
import assert from 'assert';
import { expect } from 'chai';

import { brain } from '../src/helpers/utils'

describe('Function', () => {
  const app = new App;

  describe('Brain', () => {
    const arr = [[1,1,1],
                 [0,1,1],
                 [0,0,0]];

    it('should return 0 if POPULATED cell fewer than 2', () => {
      // expect(brain(0,0,arr)).toEqual(0);
      assert.equal(brain(2, 0, arr), 0);
    });
    it('should return 1 if POPULATED cell count between 2 and 3', () => {
      assert.equal(brain(0, 2, arr), 1);
    });
    it('should return 0 if POPULATED cell count greater than 3', () => {
      assert.equal(brain(1, 1, arr), 0);
    });
    it('should return 1 if EMPTY cell count 3 or 6', () => {
      assert.equal(brain(1, 0, arr), 1);
    });
  });

  describe('GenerateNum', () => {
    it('shoud return a number greater than 0', () => {
      expect(app.generateNum()).to.be.above(0);
    });
    it('shoud return a number less than than 5', () => {
      // assert.isAbove(app.generateNum(), 0);
      expect(app.generateNum()).to.be.below(5);
    });
  });

  // describe('', => {
  //   it('', () => {});
  // });
});

// Had issues with compiling CSS but added ignore-styles
// function noop() {
//   return 0;
// }
// require.extensions['.css'] = noop;
