module.exports = function(){
    let cookies = document.cookie.split(';');

    for(let i = 0; i < cookies.length;i++){
        let current = cookies[i];
        document.cookie = `${current}";expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    }

    console.log("All cookies was deleted ");

    return {isOK:true,emptyCookies:document.cookie}
}