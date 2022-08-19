import React from "react";
import styled from 'styled-components';

const PopUpStyle = styled.div`
    background-color:#000;
    position:absolute;
    left: 50%;
    transform:translateX(-50%);
    color: #fff;
    padding: 1rem;
    border-radius:5px;
    transition:transform 0.15s;
`;

const PopUp = React.forwardRef((props,ref)=>{
    const {text} = props;
    return <>
        <PopUpStyle ref={ref}>
            <p>{text}</p>
        </PopUpStyle>
    </>
})

function swap(ref,loading = true,from,to){
    ref.current.style = `transform:translate(-50%,${loading ? from : to})`;
}

export {PopUp,swap}