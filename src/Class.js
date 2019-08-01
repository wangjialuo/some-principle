import React from 'react';

function AsyncAwait() {
  return (
    <div className="App">
    </div>
  );
}

class A {
  constructor () {
    this.b()
  }
  static a() {
    console.log(2222)
  }
  b() {
    console.log(1111)
  }
}
A.a()
var a = new A()
a.b()

export default AsyncAwait
