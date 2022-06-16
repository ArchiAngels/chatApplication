export default function(event){

    let formChildren = event.target.children;
    let values = {};
    

    for(let i = 0; i < formChildren.length ; i++){

        let currentElem = formChildren[i];
  
        if(isInput(currentElem) && i != formChildren.length -1){
          values[currentElem.id] = currentElem.value;
        }
  
    }


    function isInput(element){
        return element.tagName === 'INPUT' ? true : false; 
    }

    function isForm(element){
        return element.tagName === 'FORM' ? true : false; 
    }

    return values;



}