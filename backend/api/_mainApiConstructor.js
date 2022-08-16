const NOTCHANGEDCONSTANT = 'apiUrl';


function apiConstructor(url = NOTCHANGEDCONSTANT,api=[NOTCHANGEDCONSTANT],options,req = NOTCHANGEDCONSTANT,res = NOTCHANGEDCONSTANT){

    if(url === NOTCHANGEDCONSTANT){
        return Promise.reject('your passed bad api_-url');
    }else if(api[0] === NOTCHANGEDCONSTANT || !(api instanceof Object)){
        return Promise.reject('your passed bad api_-api');
    }else if(req === NOTCHANGEDCONSTANT){
        return Promise.reject('your passed bad api_-req');
    }else if(res === NOTCHANGEDCONSTANT){
        return Promise.reject('your passed bad api_-res');
    }


    return new Promise(function(resolve,reject){
        let timer = setTimeout(()=>[
            reject('server doesnt response')
        ],10000);

        function clearTimeOut(e){
            clearTimeout(timer);

            if(e){
                reject(e);
            }
        }

        let thisApi = api.value.filter(e => e.name === url)[0];
        resolve({exe:thisApi,time:clearTimeOut});
        

    }).then(v => {
        v.time();
        v.exe.exe(options,req,res);

        return {isOK:true}
    }).catch(e=>{
        res.end(e);
        return {isOK:false,err:e}
    })

}

function getMethods(path=NOTCHANGEDCONSTANT){
    let result = {isOK:false};

    if(path === NOTCHANGEDCONSTANT){
        return {...result,why:'path was not entered'}
    }else{
        const fs = require('fs');

        let resultDir = [];
        let way = `${__dirname}${path}`;
        let dir = fs.readdirSync(way);

        for(let i =0; i < dir.length;i++){

            resultDir.push({
                name:dir[i].split('.')[0],
                exe:function(options,req,res){
                    let method = require(`${way}/${dir[i]}`)[this.name];
                    return method(options,req,res);
                }
            })
        }

        result.isOK = true;
        result.value = resultDir;
        return {...result};
    }


}

function automative(apiDirectory = NOTCHANGEDCONSTANT,url,options = {isEmpty:true},req,res){

    if(apiDirectory === NOTCHANGEDCONSTANT){
        throw new Error('api path dir is missing');
    }
    const sendResponse = require('../scripts/ServerScripts/AllRespnonsesController.js');

    let apiMethods = getMethods(apiDirectory);

    if(!options.isEmpty){
        if(url === '' || url === NOTCHANGEDCONSTANT){
          res.end('Bad url');
        }
        else{
          return apiConstructor(url,apiMethods,options,req,res);
        }
      }else{
        res.end('bad');
      }  
}
module.exports = {apiConstructor,getMethods,automative};