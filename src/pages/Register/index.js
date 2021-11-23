import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { LogoSmall } from "../../assets";
import { TextInput } from "react-native-paper";
import {
  colors,
  heightMobileUI,
  responsiveHeight,
  responsiveWidth,
} from "../../utils";
import Jarak from "../../components/Jarak";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  useEffect(() => {
    const noUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("MainApp");
      }
      // console.log(user);
      return noUser;
    });
  }, []);

  const submit = () => {
    if (email === "" && password === "") {
      Alert.alert("Masukkan data lengkap!");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.displayName = username;
        navigation.replace("MainApp");
        Alert.alert("Registrasi Berhasil");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperLogo}>
        <LogoSmall style={styles.logo} width={180} height={100} />
      </View>
      <View style={styles.sectionLoginForm}>
        <Text style={styles.sectionTitle}>Form Register</Text>
        <Text style={styles.sectionText}>Please register your data</Text>
        <Jarak height={25} />

        <View>
          <TextInput
            mode="outlined"
            label="Username"
            placeholder="Input your username"
            value={username}
            onChangeText={(value) => setUsername(value)}
            right={<TextInput.Affix />}
          />
          <TextInput
            mode="outlined"
            label="Email"
            placeholder="Input your email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            right={<TextInput.Affix />}
          />
          <Jarak height={10} />
          <TextInput
            mode="outlined"
            label="Password"
            placeholder="Input your password"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
            right={<TextInput.Affix />}
          />
          <Jarak height={25} />
          <TouchableOpacity onPress={submit} style={styles.buttonLogin}>
            <Text style={styles.textLogin}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sectionRegisterAccount}>
        <Text style={styles.titleText}>Have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.registerText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapperLogo: {
    paddingVertical: 50,
    alignItems: "center",
  },
  logo: {
    resizeMode: "center",
  },
  sectionTitle: {
    color: colors.colorPrimary,
    fontSize: RFValue(24, heightMobileUI),
    fontWeight: "bold",
  },
  sectionText: {
    color: colors.colorPrimary,
    fontSize: RFValue(18, heightMobileUI),
    fontWeight: "600",
    marginTop: 8,
  },
  sectionLoginForm: {
    paddingHorizontal: 30,
  },
  buttonLogin: {
    backgroundColor: colors.colorPrimary,
    alignItems: "center",
    paddingVertical: 17,
    borderRadius: 8,
  },
  textLogin: {
    color: colors.white,
    fontSize: RFValue(24, heightMobileUI),
  },
  sectionRegisterAccount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: responsiveHeight(80),
  },
  titleText: {
    color: colors.colorPrimary,
  },
  registerText: {
    color: colors.colorPrimary,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
