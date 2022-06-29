module.exports = function(user,login,password){

    return new Promise(function(myresolve,myreject){

        let loginCheck = user.login === login;
        let passwordCheck = user.password === password;

        let condition = loginCheck && passwordCheck;

        if(condition){
            myresolve({isOK:true,status:"logged"});
        }else{
            myreject({isOK:false,why:"login or password doesn't match"});
        }
        

    }).then(
        function(value){
            return value;
        },
        function(error){
            return error;
        }
    )
    

}
