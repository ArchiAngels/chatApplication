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
  let msg = `Where i need to send: \n ${method} \n${url}\n`;
  console.log(msg);
    let body = JSON.stringify(value);
    let xhr = new XMLHttpRequest();
        xhr.open(method,url);
        xhr.send(body);
        xhr.onload = ()=>{
          console.log(xhr.responseText , xhr.status);
          callback(xhr);
        }
}