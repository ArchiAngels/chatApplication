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


import {io} from 'socket.io-client';
const socket = io('ws://localhost:8080');

socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});



const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <>
      <BrowserRouter>
      
        <Nav/>
        <CookieChecker/>

        <Routes>
        
          {/* <Route path="/chat" element={<App />} /> */}
          <Route path="/*" element = {<Welcome />}/>
          <Route path="/yourProfile" element = {<YourProfile />}/>
          <Route path="/auth" element = {<Auth />}/>
          <Route path="/chatRoom/:id" element = {<ChatRoom socket={socket}/>}/>
        </Routes>

      </BrowserRouter>
  </>
);