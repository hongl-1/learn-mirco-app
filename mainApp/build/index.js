const fs = require('fs')
const dirNames = fs.readdirSync('./dist/src/pages')
for(let i = 0;i < dirNames.length;i++){
  console.log(dirNames)
  const files = fs.readdirSync(`./dist/assets`)
  fs.mkdirSync(`./dist/src/pages/${dirNames[i]}/assets`)
  for (let j = 0; j < files.length; j++) {
    const file = files[j];
    fs.copyFileSync(`./dist/assets/${file}`, `./dist/src/pages/${dirNames[i]}/assets/${file}`)
  }
}
