const checkUserHaveSomeCookies = require("./checkUserHaveSomeCookies.js");
const  deleteAllCookies = require('./deleteAllCookies.js');

module.exports = function CheckCookies(obj,setObj,auto = false){
    let result = checkUserHaveSomeCookies();
    console.log('Checking cookies');

    if(obj.isOK === false){ 
        if(result.isOK === true){
            setObj({...result})
        }else{
            setObj({redirect:true});
        }

    }else if(obj.isOK === true){
        
        if(result.isOK === false){
            deleteAllCookies();
            obj = {...result,redirect:true};
            auto = false;
            setObj(obj);
        }

        if(auto){
            setTimeout(()=>{
                CheckCookies(obj,setObj,auto)
            },1000);
        }

        
    }

    
}
