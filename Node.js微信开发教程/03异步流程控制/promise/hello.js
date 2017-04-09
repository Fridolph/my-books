var fs = require('fs')

fs.readFile('./data.json', (err, data) => {
  if (err) console.log(err);
  console.log(data.toString());
})

function hello(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    })
  })
}

// hello('./data.json').then(data => {
//   console.log('promise result = ' + data);
// }).catch(err => {
//   console.log(err);
// })

