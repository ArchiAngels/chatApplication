function compareResult(url,meta){
    let match = url.slice(0,meta.length);
    return match === meta;
}

function isHomePage(url){
    // let homePageUrls = ['/']
    return url === '/'
}

function isApiRoom(url){
    let meta = '/apiRoom';
    return compareResult(url,meta);
}

function isApiUser(url){
    let meta = '/apiUser';
    return compareResult(url,meta);
}

function isPublicDirectory(url){
    let meta = '/client';
    return compareResult(url,meta);
}


function isChatRoom(url){
    let meta = '/chatRoom';
    return compareResult(url,meta);
}


module.exports = {
    isHomePage,
    isApiRoom,
    isApiUser,
    isPublicDirectory,
    isChatRoom
};