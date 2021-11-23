import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Logo } from "../../assets";
import { colors } from "../../utils";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.textSplash}>
        Resep masakan enak dan mudah ala master chef
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textSplash: {
    color: colors.colorPrimary,
  },
});
