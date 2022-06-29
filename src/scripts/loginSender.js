export default function(method,url,value,callback){
  return new Promise(function(resolve,reject){
    let body = JSON.stringify(value);
    let TimeUp = setTimeout(()=>{
      reject('time up 5.0 sec, server don\'t respond');
    },5000)
    let xhr = new XMLHttpRequest();
        xhr.open(method,url);
        xhr.send(body);
        xhr.onload = ()=>{
          clearTimeout(TimeUp);
          resolve(xhr);

        }
  }).then(
    function(value){
      callback({isOK:true,value:value});
    },
    function(error){
      callback({isOK:false,error:error});
    }
  )
    
}