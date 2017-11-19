const http = require('http')
const url = require('url')
const jsdom = require('jsdom').JSDOM

let xx = 'http://www.jianshu.com/users/53fb509bd05c/latest_articles'//该案例受网站节制
getContent(xx,success,err)


function success(buffer){
    let cont = buffer.toString()
    let dom = new jsdom(cont)
    console.log(dom.window.document.querySelector('.name').textContent)
}
function err(err){
    console.log(err)
}



function getContent(sUrl,success,err){
    let {hostname,path} = url.parse(sUrl)
    let arr = []
    let req = http.request({
        hostname:`${hostname}`,
        path:`${path}`
        },res => {
            if(res.statusCode==301 || res.statusCode==302){
                
                let Url = res.headers['location']
                getContent(Url,success,err)
            }else if(res.statusCode==200){
                res.on('data',(buffer)=>{
                    arr.push(buffer)
                })
                res.on('end',()=>{
                    let cont = Buffer.concat(arr)
                    success(cont)
                })
            }else{
                console.log(res.statusCode)
            }           
        })
    req.end()
    req.on('err',(error)=>{
        console.log('通讯失败')
        err(error)
    })
}
