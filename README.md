findBy
===

## what?
A little module to provide a more fluid find interface for arrays. <br />
Allows prop name in function calls with value and predicate matching.

findBy uses a ES6 proxy, so a findBy array can be used in place of any array.

## install

<code>npm install find-by-array --save</code>

## use

<code>const findBy = require('find-by-array');</code><br />
<code>findBy([{ id: 1 }, { id: 2 }]).findById(2);</code><br />
<code>findBy([{ id: 1 }, { id: 2 }], 'filterBy').filterById(2);</code><br />
<code>findBy([{ id: 1 }, { id: 2 }]).findById(id => id > 1);</code><br/>
<code>findBy([{ name: 'Bob', age: 20 }, { name: 'Susan', age: 21 }]).findByName('Susan');</code><br />
<code>findBy([{ name: 'Bob', age: 20 }, { name: 'Susan', age: 21 }], 'filterBy').filterByName('Susan');</code><br />
<code>findBy([{ name: 'Bob', age: 20 }, { name: 'Susan', age: 21 }]).findByAge(age => age > 20);</code>
