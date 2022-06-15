module.exports = function(datauser){
    const getId = require('./idManagment/getIdConstant.js');
    const setId = require('./idManagment/updateIdConstant.js');
    let msg = `Passed data in CreatenewUser :: ${datauser}`;
    console.log(msg);
    return new Promise(async function(resolve,reject){

        let result = await getId();
        
        if(result.isOK){
            resolve(result);
        }else{
            reject(result);
        }


    }).then(
        function(value){
            console.log(value);
            return {isOk:true,body:value};
        },
        function(error){
            let msg = `Rejected by ${error.why}`;
            console.log(msg);
            return {isOk:false,why:error};
        }
    )
}