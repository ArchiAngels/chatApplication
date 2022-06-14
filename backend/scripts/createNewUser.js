module.exports = function(datauser){
    const queryDb = require('./openDB.js');
    let msg = `Passed data in CreatenewUser :: ${datauser}`;
    console.log(msg);
    return new Promise(function(resolve,reject){
        let timeOver = setTimeout(()=>{
            reject('Time out 5.0s create user')
        },5000);

        let result = queryDb();
        clearTimeout(timeOver);
        resolve(result);



    }).catch((reason)=>{
        let msg = `Rejected by ${reason}`;
        console.log(msg)
    })
}