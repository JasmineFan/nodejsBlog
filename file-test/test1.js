const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, 'data.txt')

// fs.readFile(fileName, (err, data)=>{
//     if(err){
//         console.error(err)
//         return
//     }
//     console.log(data.toS)
// })

/* const content = '这是新写入的内容\n'
const opt = {
    flag: 'a'  //追加
}
fs.writeFile(fileName,content,opt,(err)=>{
    if(err) {
        console.error(err)
        return
    }
}) */

fs.exists(fileName+'1',(exist)=>{
    console.log('exist', exist)
})