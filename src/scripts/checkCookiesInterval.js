const checkUserHaveSomeCookies = require("./checkUserHaveSomeCookies.js");
const  deleteAllCookies = require('./deleteAllCookies.js');

module.exports = function CheckCookies(obj,setObj,auto = false,whoPASSED = 'dont know who'){
    
    let result = checkUserHaveSomeCookies();
    console.log(`what actulaly passed:;`,obj,whoPASSED,auto,result);

    function ChangeState(obj){
        console.log(`change State `,obj,whoPASSED);
        return {value:{...obj},isOK:result.isOK};
    }

    if(obj.isOK === false){ 
        if(result.isOK === true){
            return ChangeState({...result})
        }else{
            return ChangeState({redirect:true});
        }

    }else if(obj.isOK === true){
        
        if(parseInt(result.timeCookies) <= 0){
            debugger
            deleteAllCookies();
            auto = false;
            return ChangeState({redirect:true});
        }else{
            return ChangeState({...result});
        }

        // if(auto){
        //     setTimeout(()=>{
        //         CheckCookies(obj,setObj,auto)
        //     },1000);
        // }

        
    }

    
}
