import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App.jsx";

import Welcome from "./routes/welcome.jsx";
import YourProfile from "./routes/yourProfile.jsx";
import Auth from './routes/auth.jsx';

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <>
      <BrowserRouter>
      {/* <Nav/> */}
        <Routes>
          <Route path="/chat" element={<App />} />
          <Route path="/firstContact" element = {<Welcome />}/>
          <Route path="/yourProfile" element = {<YourProfile />}/>
          <Route path="/auth" element = {<Auth />}/>
        </Routes>
      </BrowserRouter>
  </>
);