module.exports = function getMessage(method,url){
    return new Promise(function(resolve,reject){

        let timeOut = setTimeout(()=>{
            reject('time out')
        },5000);

        function deleteTimer(e){
            clearTimeout(timeOut)
            if(e){
                reject(e)
            }
        }

        let xhr = new XMLHttpRequest();
            xhr.open(method,url);
            xhr.send();
            xhr.onload = ()=>{
                resolve(xhr.responseText);
            }
    }).catch(err=>{
        return {isOK:false,why:err}
    }).then(value=>{
        return {isOK:true,value:value};
    })
}