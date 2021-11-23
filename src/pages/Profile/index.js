import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { IconEdit, IconLogout, IconSetting } from "../../assets";
import {
  colors,
  heightMobileUI,
  responsiveHeight,
  responsiveWidth,
} from "../../utils";
import { getAuth } from "@firebase/auth";

const Profile = ({ navigation, route }) => {
  const auth = getAuth();

  console.log(auth);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperContent}>
        <Image
          style={styles.imageUser}
          source={require("../../assets/images/user.png")}
        />
        <View style={styles.sectionProfile}>
          <Text style={styles.sectionTextName}>
            {auth.currentUser?.displayName}
          </Text>
          <Text style={styles.sectionTextEmail}>{auth.currentUser?.email}</Text>
        </View>
        <View style={styles.sectionMenuProfile}>
          <TouchableOpacity style={styles.wrapperMenu}>
            <IconEdit />
            <Text style={styles.textMenu}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.wrapperMenu}>
            <IconSetting />
            <Text style={styles.textMenu}>Setting</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={styles.wrapperMenu}>
            <IconLogout />
            <Text style={styles.textMenu}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorSecondary,
  },
  wrapperContent: {
    position: "absolute",
    bottom: 0,
    height: responsiveHeight(700),
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageUser: {
    height: 130,
    width: 130,
    borderRadius: 130 / 2,
    marginTop: -60,
    alignSelf: "center",
  },
  sectionProfile: {
    alignItems: "center",
    paddingVertical: 30,
  },
  sectionTextName: {
    color: colors.colorPrimary,
    fontSize: RFValue(20, heightMobileUI),
    fontWeight: "bold",
  },
  sectionTextEmail: {
    marginTop: 10,
    color: colors.colorPrimary,
    fontSize: RFValue(20, heightMobileUI),
  },
  sectionMenuProfile: {
    paddingHorizontal: 30,
  },
  wrapperMenu: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: "#868686",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textMenu: {
    marginLeft: 20,
    color: colors.colorPrimary,
    fontSize: RFValue(20, heightMobileUI),
  },
});
