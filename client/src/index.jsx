import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ContextProvider } from "./context/context.jsx";

import App from './App.jsx';
import "./index.scss";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="988570206494-hma6hf4h3t5sudsbdfs9186vhhjodp13.apps.googleusercontent.com">
      <ContextProvider>      
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
