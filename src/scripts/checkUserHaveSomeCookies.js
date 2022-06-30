module.exports = function(){
    let cookies = document.cookie.split(';');
    let objCookies = {}

    for(let i = 0; i < cookies.length;i++){
        let current = cookies[i].split("=");
        if(current[1] === 'true' || current[1] === 'false'){
            current[1] = new Boolean(current[1]).valueOf();
        }
        objCookies[current[0].trim()] = current[1];
    }

    let result = {...objCookies,isOK:objCookies.logged || false};
    return result
}