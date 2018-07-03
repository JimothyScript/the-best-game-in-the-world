// import React from 'react';
import App from '../src/components/App';
const assert = require('assert');

describe('Function', () => {
  describe('Brain', () => {
    const arr = [[1,1,1],
                 [null,1,1],
                 [null,null,null]];
    const app = new App;
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
});

// Had Issues with compiling CSS but added ignore-styles
// function noop() {
//   return null;
// }
// require.extensions['.css'] = noop;
