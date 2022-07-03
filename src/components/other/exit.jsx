import React from "react";
import {Navigate} from 'react-router-dom';

export default function EXIT(){
    console.log("FORCE EXIT");

    return <>
        <Navigate to='/firstContact' replace={true}/>
    </>
}