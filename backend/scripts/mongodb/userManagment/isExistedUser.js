module.exports = function(datauser){
    let msg = `Passed data in isExistedUSer :: ${datauser}`;
    console.log(msg);
    return new Promise(async function(resolve,reject){
        
        if(result.isOK){
            resolve(result);
        }else{
            reject(result);
        }


    }).then(
        function(value){
            console.log(value);
            return {isOK:true,...value};
        },
        function(error){
            let msg = `Rejected by ${error.why}`;
            console.log(msg);
            return {isOK:false,...error};
        }
    )
}