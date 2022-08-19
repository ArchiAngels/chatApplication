

function sendResponseWithCookies(res,resText,code = 200,cookie = 'NOREGUIRED'){

    const rulesCookies = ";Path=/;SameSite=Lax";
  
    cookie = cookie === 'NOREGUIRED' ? [] : cookie;
    
    cookie = cookie.map(e => {return e+rulesCookies});
  
    res.setHeader('Set-Cookie',cookie);
    res.writeHead(code,{
      'Content-Type': 'text/html;charset=UTF-8',
    });
    return res.end(resText)
};


module.exports = {sendResponseWithCookies};