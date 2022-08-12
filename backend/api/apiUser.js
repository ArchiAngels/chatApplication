// const express = require('express');
// const router = express.Router();
const MongoChanger = require('../scripts/mongodb/allMongoControllers.js');
const Response = require('../scripts/ServerScripts/AllRespnonsesController.js');
const isAdmin = require('../scripts/ServerScripts/isAdmin.js');

// router.use((req, res, next) => {
//   console.log('Time: ', Date.now());
//   next();
// });

let timeInMs = 30 * 60 * 1000 ;

// let timeInMs = 10*1000 ;

const TimeExpiresCookies = ()=>{
  return new Date(Date.now() + timeInMs);
}
// router.post('/createNewUser',(req,res)=>{
//   req.on('data',async (chunk)=>{
//     chunk = chunk+'';
//     chunk = JSON.parse(chunk);
//     let result = await MongoChanger.findUserByLogin(chunk.nickname,false);
//     if(result.isOK){
//       // create new user
//       let new_user = await MongoChanger.createNewUser(chunk.nickname,chunk.password);
//       if(new_user.isOK){
//         res
//           .status(200)
//           .cookie('logged','true')
//           .cookie('nickname',chunk.nickname)
//           .cookie('timeCookies',timeInMs)
//           .json(Response.Good({msg:"Succesfully created"}))
//           // .json({isOK:true,value:{body:{}})
//       }else{
//         res.json(Response.Bad(new_user))
//         // res.json({isOK:false,value:new_user});
//       }
//     }else{
//       console.log(result);
//       res.json(Response.Bad(result))
//       // res.json({isOK:false,value:result});
//     }
    
//   })
  
// });


// router.post('/loginUser',(req,res)=>{
//   req.on('data',async (chunk)=>{
//     chunk = chunk+'';
//     chunk = JSON.parse(chunk);
//     let result = await MongoChanger.findUserByLogin(chunk.nickname,true);
//     if(result.isOK){
//       // no find iuser
//       res.json({isOK:false,value:{why:{messageAuthor:'no register account'}}});
//     }else{
//       let isPass = await MongoChanger.isPasswordAndLoginMatch(result.why.user,chunk.nickname,chunk.password);
//       if(isPass.isOK){
//         if(isAdmin(chunk.nickname).isOK){
//           return res
//           .status(200)
//           .cookie('logged','true')
//           .cookie('nickname',chunk.nickname)
//           .cookie('admin','YesButNeedToVerify')
//           .cookie('timeCookies',timeInMs)
//           .json(Response.Good(isPass))
//           // .json({isOK:true,value:{body:isPass}});
//         }
//         return res
//           .status(200)
//           .cookie('logged','true')
//           .cookie('nickname',chunk.nickname)
//           .cookie('timeCookies',timeInMs)
//           .json(Response.Good(isPass))
//           // .json({isOK:true,value:{body:isPass}});

//       }else{
//         res.json(Response.Bad({why:isPass}))
//         // res.json({isOK:false,value:{why:isPass}});
//       }
      
//     }
//   })
//   // res.json({isOK:false,value:{why:{messageAuthor:"none inPROGRESS"}}});
// });

// module.exports = router;
function WhatNeedToDo(url,options = {isEmpty:true},req){
  console.log(url,options);

  return new Promise(function(resolve,reject){
    if(options.isEmpty){
      // res.write('enter data');
      // res.end();
      resolve({isOK:true,output:Response.Bad({value:{why:{messageAuthor:'no register account'}}})});
    }else{
      if(url === 'loginUser'){
        req.on('data',async (data)=>{
  
          data += '';
          data = JSON.parse(data);
  
          // return chunk;
        
        
        console.log(`\n\n\n`)
        console.log(data);
        console.log(`\n\n\n`)
          let result = await MongoChanger.findUserByLogin(data.nickname,true);
  
          if(result.isOK){
            // res.end(Response.Bad({value:{why:{messageAuthor:'no register account'}}}));
  
            resolve({isOK:true,output:Response.Bad({value:{why:{messageAuthor:'no register account'}}})});
            
          }else{
  
            let isPass = await MongoChanger.isPasswordAndLoginMatch(result.why.user,data.nickname,data.password);
  
            if(isPass.isOK){
  
              if(isAdmin(data.nickname).isOK){
  
                // res.setHeader("Set-Cookie",`logged=true;`,"Set-Cookie",,"Set-Cookie",`timeCookies=${timeInMs};`);
                // res.setHeader('Set-Cookie',['logged=true',`nickname=${chunk.nickname}`,`timeCookies=${timeInMs}`]);
                // // res.setHeader('Set-Cookie',['asd=123','asdasdasd=56456456','hhahaa=asdasd']);
                // res.writeHead(200,{
                //   'Content-Type': 'text/plain;charset=UTF-8',
                // });
                // res.end();
  
                resolve( {isOK:true,output:Response.Good(isPass),cookies:['logged=true',`nickname=${data.nickname}`,`timeCookies=${timeInMs}`]});
  
              }else{
                
                // res.setHeader('Set-Cookie',['logged=true',`nickname=${chunk.nickname}`,`timeCookies=${timeInMs}`]);
                // // res.setHeader("Set-Cookie",`logged=true;SameSite=None;Secure;nickname=${chunk.nickname};SameSite=None;Secure;timeCookies=${timeInMs};SameSite=None;Secure;`);
                // res.writeHead(444);
                // res.end(Response.Good(isPass));
  
                resolve( {isOK:true,output:Response.Good(isPass),cookies:['logged=true',`nickname=${data.nickname}`,`timeCookies=${timeInMs}`]});
              }
      
            }else{
              // res.writeHead(555);
              // res.end(Response.Bad({why:isPass}));
  
              resolve( {isOK:true,output:Response.Bad({why:isPass})});
            }
          }
        });
      }
    }
  })

  
}

// module.exports = router;
module.exports = {WhatNeedToDo};

