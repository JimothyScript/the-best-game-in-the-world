// import React from 'react';
import App from '../src/components/App';
import assert from 'assert';
import { expect } from 'chai';

describe('Function', () => {
  const app = new App;

  describe('Brain', () => {
    const arr = [[1,1,1],
                 [null,1,1],
                 [null,null,null]];

    it('should return null if POPULATED cell fewer than 2', () => {
      // expect(test.brain(0,0,arr)).toEqual(null);
      assert.equal(app.brain(2,0,arr), null);
    });
    it('should return 1 if POPULATED cell count between 2 and 3', () => {
      assert.equal(app.brain(0,2,arr), 1);
    });
    it('should return null if POPULATED cell count greater than 3', () => {
      assert.equal(app.brain(1,1,arr), null);
    });
    it('should return 1 if EMPTY cell count 3 or 6', () => {
      assert.equal(app.brain(1,0,arr), 1);
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
//   return null;
// }
// require.extensions['.css'] = noop;
