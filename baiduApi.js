const requests = require('request')
const fs = require('fs');
const path = require('path');
// const mineType = require('mime-types');
 
var filePath = path.resolve('./files/16k.wav');
 
var data = fs.readFileSync(filePath);

data = Buffer.from(data).toString('base64');
console.log(data);

var parms = {
    "format":"wav",
    "rate":16000,
    "dev_pid":1537,
    "channel":1,
    "token":"24.34a0edb9aefd76c421d3688c6f377445.2592000.1624611790.282335-24219750",
    "cuid":"6433214037620997779",
    "len":129998,
    "speech":data
}
function parseUrl(url) {
    return new Promise((resolve, reject) => {
        requests.post({
            url: url,
            headers: {
                'content-type':'application/json'
            },
            json: true,
            body: JSON.stringify(parms)
        }, (error, response, bodys) => {
            if(!error && response.statusCode == 200) {
                resolve(bodys)
            }else {
                console.log(error.message)
                reject({})
            }
        })
    })
}

const url = 'http://vop.baidu.com/server_api';
parseUrl(url)
.then((res) => {
    console.log(res)
})
