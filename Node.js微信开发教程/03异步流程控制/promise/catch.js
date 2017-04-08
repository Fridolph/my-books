var p = new Promise((resolve, reject) => {
  resolve('Success')
})

p.then(value => {
  console.log(value);
  return Promise.reject('oh, no!')
}).catch(e => {
  console.log(e);
}).then(() => {
  console.log('after a catch the chain is restored.');
}, () => {
  console.log('not fired the bug to the catch');
})