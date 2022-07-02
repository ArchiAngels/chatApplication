let admins = ['archiangels'];

module.exports = function isAdmin(name){
    let result = {isOK:false};


    for(let i =0; i < admins.length;i++){
        if(admins[i] === name){
            result.isOK = true;
            break;
        }
    }

    return result;
}