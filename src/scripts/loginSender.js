/*
*   {Params}  {TYPE}   {isRequired}  {details}
*
*    method   {string} required
*    url      {string} required
*    value    {object}  required   array contain objects like {nickname,password}
*    callback {fn}     optional
*
*/




export default function(method,url,value,callback){
  // let msg = `Where i need to send: \n ${method} \n${url}\n`;
  // let msg = 'need send';
  // console.log(msg);
  return new Promise(function(resolve,reject){
    let body = JSON.stringify(value);
    let TimeUp = setTimeout(()=>{
      reject('time up 5.0 sec, server do\'nt respond');
    },5000)
    let xhr = new XMLHttpRequest();
        xhr.open(method,url);
        xhr.send(body);
        xhr.onload = ()=>{
          clearTimeout(TimeUp);
          // console.log(xhr.responseText , xhr.status);
          resolve(xhr);

        }
  }).then(
    function(value){
      console.log('good values come');
      callback(value);
    },
    function(error){
      console.log('bad values dont come',error);
    }
  )
    
}