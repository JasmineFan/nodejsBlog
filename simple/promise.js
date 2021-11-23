const fs= require('fs')
const path = require('path')

function getFileContent (fileName) {
    const promise = new Promise((resolve, reject)=>{
        const fullFileName = path.resolve(__dirname, 'files', fileName)
        fs.readFile(fullFileName, (err, data)=> {
            if(err){
               reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}
/* getFileContent('a.json').then(aData=>{
    console.log('a data', aData)
    return getFileContent(aData.next)
}).then(bdata=>{
    console.log('bdata', bdata)
    return getFileContent(bdata.next)
}).then(cdata=>{
    console.log('cdata', cdata)
}) */
/
async function readFileData() {
    try{
        const aData = await  getFileContent('a.json')
        console.log('a.data', aData)
        const bData = await getFileContent(aData.next)
        console.log('b.data',bData)
        const cData = await getFileContent(bData.next)
        console.log('c.data',cData)
    } catch (err) {
        console.error(err)
    }
   
}

readFileData() 

/* async function readAData(){
    const aData = await getFileContent('a.json')
    return aData
}
async function test(){
        const aData = await readAData()
        console.log(aData)
}
test() */