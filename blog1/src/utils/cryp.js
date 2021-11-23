const crypto = require('crypto')

const SECRET_KEY = 'WJcisZ_397#'

function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}
function getPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

const result = getPassword('123')
console.log(result)
module.exports =  {
    getPassword
}