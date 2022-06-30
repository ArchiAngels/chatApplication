module.exports = function(newTime){
    let cookies = document.cookie.split(';');

    for(let i = 0; i < cookies.length;i++){
        let current = cookies[i].split('=');

        current[0] = current[0].trim();

        // console.log(current[0],current[0] === 'timeCookies')
        if(current[0] === 'timeCookies'){
            document.cookie = `${current[0]}=${newTime}`;
            break;
        }

        

    }
    console.log({isOK:true,timeCookies:newTime});

    return {isOK:true,timeCookies:newTime}
}