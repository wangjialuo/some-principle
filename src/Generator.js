import React from 'react';

function Generator() {
  return (
    <div className="App">
    </div>
  );
}
// Generator ES6 异步编程
// Generator 最大特点交出执行权,暂停函数的执行
//写法不太一样
//1: function 有*
//2: yield语句可以定义不同的内部状态
// 本质上:
// 异步任务的容器
// yield 不同阶段的分界线
// 所以说 有时也会把yield当成是return
// 但是有本质不同

//最简单的Generator
// function * f() {
//   yield 'a'
//   yield 'b'
//   yield 'c'
//   yield 'd'
//   return 'f'
// }
//
// const _f = f()
// console.log(_f.next())
// console.log(_f.next())
// console.log(_f.next())
// console.log(_f.next())
// console.log(_f.next())

// function * f() {
//   var _n = 1
//   yield ++_n
//   yield ++_n
//   yield ++_n
// }
// var aa = f()
// var bb = f()

// 从上面aa,bb二哥迭代器来看
//每个迭代器之间相互独立 作用域独立
// console.log(aa.next())
// console.log(bb.next())

// Generator.next函数中可以接受参数
// 传入参数吧上一个yield的返回值覆盖了
// 第一个.next()方法其实是启动器
// 在他之前没有yield
// 多以给第一个next()方法传参没有意义
function * f() {
  var _n = 1
  var _v = yield _n +22
  console.log('a---' + _v)
  yield ++_n
  yield ++_n
}
var _f = f()

//第一个next返回的value是23
console.log(_f.next())
console.log(_f.next('abc'));
console.log(_f.next());
export default Generator
