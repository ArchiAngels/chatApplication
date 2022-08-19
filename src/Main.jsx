import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Nav from "./components/NavBar/Nav.jsx";

import Welcome from "./routes/welcome.jsx";
import YourProfile from "./routes/yourProfile.jsx";
import Auth from './routes/auth.jsx';
import ChatRoom from './routes/chatRoom.jsx';

import CookieChecker from './components/other/CookieChecker.jsx';
import Timer from "./components/other/timer.jsx";


import { Manager } from 'socket.io-client';

let host = 'swetty.herokuapp.com';
// let host = 'localhost'
let port = '8080';
const manager = new Manager(`wss://${host}:${port}`,{
  path:'/test'
});



const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <>
      <BrowserRouter>
      
        <Nav Manager={manager}/>
        <CookieChecker/>

        <Routes>
        
          {/* <Route path="/chat" element={<App />} /> */}
          <Route path="/*" element = {<Welcome />}/>
          <Route path="/yourProfile" element = {<YourProfile />}/>
          <Route path="/auth" element = {<Auth />}/>
          <Route path="/chatRoom/:id" element = {<ChatRoom Manager={manager}/>}/>
        </Routes>

      </BrowserRouter>
  </>
);