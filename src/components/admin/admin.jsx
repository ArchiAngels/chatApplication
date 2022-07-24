import React from "react";
import styled from "styled-components";

let Container = styled.div`
    width:100%;
    background-color:#00000066;
    height:100vh;
    padding:1rem;
`;

export default function AdminPanel(){
    return <>
    <Container>

        <p>Welcome to admin panel</p>
        <p>create new Collection in database</p>
        <p>all Collections in database</p>
    </Container>
       
    </>
}