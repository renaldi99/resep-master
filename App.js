import React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/router";
import { getApps, initializeApp } from "firebase/app";
import MainRoot from "./src/router";
import { Provider } from "react-redux";
import store from "./src/reducers/store";
import firebaseConfig from "./src/config/FIREBASE";

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
