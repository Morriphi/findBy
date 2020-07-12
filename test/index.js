const { assert } = require('chai')
const findable = require('../index.js');

describe('find-by', () => {
  let arr = [];

  beforeEach(() => {
    arr = findable([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }, { id: 3, name: 'foo' }]);
  });

  it('behaves like an array', () => {
    assert.equal(arr.push({}), 4);
    assert.deepEqual(arr.concat([{}]).length, 5);
    assert.equal(arr.length, 4);
  });

  it('returns empty array when no elements found', () => {
    assert.deepEqual(arr.findById(4), []);
    assert.deepEqual(arr.findByName('baz'), []);
    assert.deepEqual(arr.findByName('buzz'), []);
  });

  it('find elements by value', () => {
    assert.deepEqual(arr.findById(2), [{ id: 2, name: 'bar' }]);
    assert.deepEqual(arr.findByName('foo'), [{ id: 1, name: 'foo' }, { id: 3, name: 'foo' }]);
  });

  it('find elements by value case insensitive', () => {
    assert.deepEqual(arr.findByid(2), [{ id: 2, name: 'bar' }]);
    assert.deepEqual(arr.findByNAME('foo'), [{ id: 1, name: 'foo' }, { id: 3, name: 'foo' }]);
  });

  it('find elements by predicate', () => {
    assert.deepEqual(arr.findById((id) => id > 1), [{ id: 2, name: 'bar' }, { id: 3, name: 'foo' }]);
  });

  it('can override function prefix', () => {
    arr = findable([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }, { id: 3, name: 'foo' }], 'filterBy');
    assert.deepEqual(arr.filterById((id) => id > 1), [{ id: 2, name: 'bar' }, { id: 3, name: 'foo' }]);
  });

  it('searches value results', () => {
    const result = arr.findByName('foo');
    assert.deepEqual(result, [{ id: 1, name: 'foo' }, { id: 3, name: 'foo' }]);
    assert.deepEqual(result.findById(3), [{ id: 3, name: 'foo' }]);
  });

  it('searches predicate results', () => {
    const result = arr.findById((id) => id > 1);
    assert.deepEqual(arr.findById((id) => id > 1), [{ id: 2, name: 'bar' }, { id: 3, name: 'foo' }]);
    assert.deepEqual(result.findByName('foo'), [{ id: 3, name: 'foo' }]);
  });

  it('searches value results with prefix override', () => {
    arr = findable([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }, { id: 3, name: 'foo' }], 'filterBy');
    assert.deepEqual(arr.filterByName('foo').filterById(3), [{ id: 3, name: 'foo' }]);
  });

  it('searches predicate results with prefix override', () => {
    arr = findable([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }, { id: 3, name: 'foo' }], 'filterBy');
    assert.deepEqual(arr.filterById((id) => id > 1).filterByName('foo'), [{ id: 3, name: 'foo' }]);
  });
});
