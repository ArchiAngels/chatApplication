module.exports = function BadResponse(passedValue={}){
    console.log('bad response::',{...passedValue});
    let output = {isOK:false,value:{}};
    
        output.value = {...passedValue};

        console.log(output)
    
    output = JSON.stringify(output);

    return output;
}