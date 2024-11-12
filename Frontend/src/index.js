import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import {configureStore} from "@reduxjs/toolkit"
import { Toaster } from "react-hot-toast";
import rootReducer from "./reducer/rootReducer";


const store = configureStore({
  reducer:rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <Provider store = {store}>
      <App /> 
      <Toaster/>
     </Provider>
  </React.StrictMode>
);
