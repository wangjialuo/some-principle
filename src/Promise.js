import React from 'react';

function AsyncAwait() {
  return (
    <div className="App">
    </div>
  );
}
// Promise存在三个状态（state）pending、fulfilled、rejected
//
//
// pending（等待态）为初始态，并可以转化为fulfilled（成功态）和rejected（失败态）
//
//
// 成功时，不可转为其他状态，且必须有一个不可改变的值（value）
//
//
// 失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）
//
//
// new Promise((resolve, reject)=>{resolve(value)}) resolve为成功，接收参数value，状态改变为fulfilled，不可再次改变。
//
//
// new Promise((resolve, reject)=>{reject(reason)}) reject为失败，接收参数reason，状态改变为rejected，不可再次改变。
//
//
// 若是executor函数报错 直接执行reject();

class myPromise {
  constructor (executor) {
    // 初始化state为等待态
    this.state = 'pending';
    //成功的值
    this.value = undefined
    //失败的值
    this.reason = undefined
    // 成功存放的数组
    this.onResolvedCallbacks = [];
    // 失败存放法数组
    this.onRejectedCallbacks = [];
    //成功
    // 现在基本可以实现简单的同步代码，但是当resolve在setTomeout内执行，then时state还是pending等待状态 我们就需要在then调用的时候，将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们
    let resolve = value => {
      // state改变,resolve调用就会失败
      if (this.state === 'pending') {
        // resolve调用后，state转化为成功态
        this.state = 'fulfilled';
        // 储存成功的值
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => {
          fn()
        })
      }
    }
    let reject = reason => {
      // state改变,reject调用就会失败
      if (this.state === 'pending') {
        // reject调用后，state转化为失败态
        this.state = 'rejected';
        // 储存失败的原因
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => {
          fn()
        })
      }
    }
    // 立即执行
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  // 当状态state为fulfilled，则执行onFulfilled，传入this.value。当状态state为rejected，则执行onRejected，传入this.reason
  // onFulfilled,onRejected如果他们是函数，则必须分别在fulfilled，rejected后被调用，value或reason依次作为他们的第一个参数
  then(onFulfilled,onRejected){
    // 状态为fulfilled，执行onFulfilled，传入成功的值
    // 声明返回的promise2
    let promise2 = new myPromise((resolve,reject) => {
      if (this.state === 'fulfilled') {
        let x = onFulfilled(this.value);
        // resolvePromise函数，处理自己return的promise和默认的promise2的关系
        resolvePromise(promise2, x, resolve, reject)
      }
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          let x = onFulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        })
        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.value)
          resolvePromise(promise2, x, resolve, reject)
        })

      }
      // 状态为rejected，执行onRejected，传入失败的原因
      if (this.state === 'rejected') {
        let x =onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject)
      };
    })
    return promise2;
  }
}
// Otherwise, if x is an object or function,Let then be x.then
// x 不能是null
// x 是普通值 直接resolve(x)
// x 是对象或者函数（包括promise），let then = x.then
// 2、当x是对象或者函数（默认promise）
// 声明了then
// 如果取then报错，则走reject()
// 如果then是个函数，则用call执行then，第一个参数是this，后面是成功的回调和失败的回调
// 如果成功的回调还是pormise，就递归继续解析
// 3、成功和失败只能调用一个 所以设定一个called来防止多次调用
function resolvePromise(promise2, x, resolve, reject) {
  console.log(x);
  if(x === promise2) {
    // reject报错
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 防止多次调用
  let called;
  // x不是null 且x是对象或者函数
  if(x!=null && typeof x === 'object' || typeof x === 'function') {
    try{
      // A+规定，声明then = x的then方法
      let then = x.then;
      if (typeof then === 'function') {
        // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
        then.call(x, y => {
          // 成功和失败只能调用一个
          if(called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject)
        }, err => {
          // 成功和失败只能调用一个
          if (called) return
          called = true;
          reject(err);// 失败了就失败了
        })
      }
      else {
        resolve(x); // 直接成功即可
      }
    } catch (e) {
      //也属于失败
      if(called) return;
      called = true;
    //  取then出错了那就不要在继续执行了
      reject(e);
    }
  } else {
    resolve(x)
  }
}


new myPromise((resolve, reject) => {
  setTimeout(res => {
    resolve(123)
  }, 2000)
}).then((res)=> {
  console.log(res)
}).then(res => {
  console.log(res+ 22)
})


export default AsyncAwait
