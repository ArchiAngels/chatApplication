module.exports = function(datauser){
    const getId = require('../mongodb/idManagment/getIdConstant.js');
    const setId = require('../mongodb/idManagment/updateIdConstant.js');
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
            // console.log(value);
            return {isOK:true,...value};
        },
        function(error){
            let msg = `Rejected by ${error.why}`;
            // console.log(msg);
            return {isOK:false,...error};
        }
    )
}