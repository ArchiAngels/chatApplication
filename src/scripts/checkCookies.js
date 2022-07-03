const checkUserHaveSomeCookies = require("./checkUserHaveSomeCookies.js");
const deleteAllCookies = require('./deleteAllCookies.js');

module.exports = function CheckCookies(obj,whoPASSED = 'dont know who'){
    
    let result = checkUserHaveSomeCookies();

    function ChangeState(objNew){
        let isOK =  objNew.isOK === undefined ? result.isOK : objNew.isOK;
        let ObjToReturn = {value:objNew,isOK: isOK  };
        return ObjToReturn;
    }

    if(!result.isOK){
        return {isOK:result.isOK};
    }else{
        if(obj.isOK === false){ 
            if(result.isOK === true){
                return ChangeState({...result})
            }else{
                return ChangeState({redirect:true});
            }
    
        }else if(obj.isOK === true){
            
            if(parseInt(result.timeCookies) <= 0){
                deleteAllCookies();
                return ChangeState({redirect:true,isOK:false,name:'timeUP'});
            }else{
                return ChangeState({...result});
            }    
            
        }
    }

    

    
}
