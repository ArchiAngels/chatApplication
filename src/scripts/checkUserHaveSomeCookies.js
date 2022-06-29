module.exports = function(){
    let cookies = document.cookie.split(';');
    let logged,nickname;

    for(let i = 0; i < cookies.length;i++){
        let current = cookies[i];
        if(current.includes('logged')){
            logged = current.split("=")[1] === 'true'? true:false;
        }else if(current.includes('nickname')){
            nickname = current.split("=")[1];
        }
    }

    let result = {logged:logged,nickname:nickname,isOK:logged || false};

    return result
}