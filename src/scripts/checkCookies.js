const checkUserHaveSomeCookies = require("./checkUserHaveSomeCookies.js");
const deleteAllCookies = require('./deleteAllCookies.js');

module.exports = function CheckCookies(obj,whoPASSED = 'dont know who'){
    
    let result = checkUserHaveSomeCookies();

    function ChangeState(objNew){
        return {value:objNew,isOK:result.isOK};
    }

    if(obj.isOK === false){ 
        if(result.isOK === true){
            return ChangeState({...result})
        }else{
            return ChangeState({redirect:true});
        }

    }else if(obj.isOK === true){
        
        if(parseInt(result.timeCookies) <= 0){
            deleteAllCookies();
            return ChangeState({redirect:true});
        }else{
            return ChangeState({...result});
        }

        
    }

    
}
