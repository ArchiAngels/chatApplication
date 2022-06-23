import React from "react";

import InputForm from './input.jsx';


export default function Login(props){
    return <>

            <InputForm width={200} height ={30} id={'nickname'} labelValue={'Nick name'} dfv={`archiangels`}/>
            <InputForm width={200} height ={30} id={'password'} labelValue={'Password'} needIconChanger ={true}  dfv={`passwordMe`}/>
    </>
}