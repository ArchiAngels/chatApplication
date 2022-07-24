module.exports = function GoodResponse(passedValue = {}){
    console.log('Good response::',{...passedValue});
    let output = {isOK:true,value:{body:{}}};

        output.value.body = {...passedValue};

    return output;
}