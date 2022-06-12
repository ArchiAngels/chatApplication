import React , {useState} from "react";

import Links_ from "./links.jsx";

export default function Nav(props){
    let [visible,setVisible] = useState(true);

    
    

    return <>

        {visible ? <Links_/> : ''}

    </>

    
}


