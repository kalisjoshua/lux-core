import {
  isArray,
  isElement,
  isFunction,
  isNode,
  isNull,
  isObject,
  isRegExp,
  isString,
} from './is';

describe('Library: is', () => {
  [
    isArray,
    isElement,
    isFunction,
    isNode,
    isNull,
    isObject,
    isRegExp,
    isString,
  ].forEach(fn => {
    describe(fn.name + ' - existential', () => {
      it(`should exist`, () => {
        expect(typeof fn).toMatch(/function/i);
      });
    });
  });

  describe(`isArray`, () => {
    it(`should return true for an Array`, () => {
      expect(isArray([])).toBe(true);
    });

    it(`should return false for anything not an Array`, () => {
      expect(isArray({})).toBe(false);
    });
  });

  describe(`isElement`, () => {
    it('should return true for a DOM element', () => {
      expect(isElement(document.createElement('div'))).toBe(true);
    });

    it('should return false for a non DOM element', () => {
      expect(isElement('')).toBe(false);
    });

    it('should return false for a text node', () => {
      expect(isElement(document.createTextNode('Hello'))).toBe(false);
    });
  });

  describe(`isFunction`, () => {
    it(`should return true for Function`, () => {
      expect(isFunction(_ => _)).toBe(true);
    });

    it(`should return false for anything not a Function`, () => {
      expect(isFunction({})).toBe(false);
    });
  });

  describe(`isNode`, () => {
    it('should return true for a text node', () => {
      expect(isNode(document.createTextNode('Hello'))).toBe(true);
    });

    it('should return false for a string', () => {
      expect(isNode('')).toBe(false);
    });

    it('should return true for a DOM element', () => {
      expect(isNode(document.createElement('div'))).toBe(true);
    });
  });

  describe(`isNull`, () => {
    it(`should return true for null`, () => {
      expect(isNull()).toBe(true);
    });

    it(`should return true for undefined`, () => {
      expect(isNull(void 0)).toBe(true);
    });

    it(`should return true for undefined`, () => {
      let temp;
      expect(isNull(temp)).toBe(true);
    });

    it(`should return false for anything not a null or undefined`, () => {
      expect(isFunction(1)).toBe(false);
    });

    it(`should return false for anything not a null or undefined`, () => {
      expect(isFunction({})).toBe(false);
    });

    it(`should return false for anything not a null or undefined`, () => {
      expect(isFunction([])).toBe(false);
    });
  });

  describe(`isObject`, () => {
    it(`should return true for a Object`, () => {
      expect(isObject({})).toBe(true);
    });

    it(`should return false for anything not a Object`, () => {
      expect(isObject([])).toBe(false);
    });
  });

  describe(`isRegExp`, () => {
    it(`should return true for a RegExp`, () => {
      expect(isRegExp(/./)).toBe(true);
    });

    it(`should return false for anything not a RegExp`, () => {
      expect(isRegExp({})).toBe(false);
    });
  });

  describe(`isString`, () => {
    it(`should return true for a String`, () => {
      expect(isString('')).toBe(true);
    });

    it(`should return false for anything not a String`, () => {
      expect(isString({})).toBe(false);
    });
  });
});
