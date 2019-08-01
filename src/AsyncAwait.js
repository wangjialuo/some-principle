import React from 'react';

function AsyncAwait() {
  return (
    <div className="App">
    </div>
  );
}
// async function fn(args) {
//   // ...
// }
//
// // 等同于
//
function fn(args) {
  return spawn(function* () {
    console.log('yield')
    yield setTimeout(() => {
       console.log(44444);
       return 3333
     })
  })
}
// spawn 函数就是自动执行器， 下面给出spawn函数的实现

function spawn(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF()// 先将Generator函数执行下，拿到遍历器对象
    function step(nextF) {
      let next
      try {
        next = nextF()
      } catch (e) {
        return reject(e)
      }
      if (next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then((v) => {
        step(() => {return gen.next(v)})
      }, (e) => {
        step(() => {return gen.throw(e)})
      })
    }
    step(() => {
      return gen.next(undefined)
    })
  })
}

console.log(1111);
fn().then(() => {
  console.log(2222);
})



export default AsyncAwait;
