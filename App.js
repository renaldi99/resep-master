import React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/router";
import { getApps, initializeApp } from "firebase/app";
import MainRoot from "./src/router";

const firebaseConfig = {
  apiKey: "AIzaSyD4n8na2mqA62xcXQAqusrVPknIwMvCXnM",
  authDomain: "reapp-193d8.firebaseapp.com",
  projectId: "reapp-193d8",
  storageBucket: "reapp-193d8.appspot.com",
  messagingSenderId: "833606108917",
  appId: "1:833606108917:web:8271d9e2d68ce3d87727bc",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Router />
    </NavigationContainer>
  );
};

export default App;
