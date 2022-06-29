module.exports = {
    getExistedCollection : require('./collection/getExistedCollections.js'),
    createNewCollection  : require('./collection/createNewCollection.js'),
    deleteCollection : require('./collection/daleteCollection.js'),
    isCollectionAlreadyCreated : require('./collection/isExistedCollection.js'),
    getIdConstant: require('./idManagment/getIdConstant.js'),
    setIdConstant: require('./idManagment/updateIdConstant.js'),
    createNewUser : require('./userManagment/createNewUser.js'),
    findUserByLogin : require('./userManagment/findUserByLogin.js')
}