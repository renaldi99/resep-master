import React, { useState, useEffect } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { LogoSmall } from "../../assets";
import { TextInput } from "react-native-paper";
import { colors, heightMobileUI, responsiveHeight } from "../../utils";
import Jarak from "../../components/Jarak";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const Login = ({ navigation }) => {
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
      Alert.alert("Email / Password Kosong");
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.replace("MainApp");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.wrapperLogo}>
        <LogoSmall style={styles.logo} width={180} height={100} />
      </View>
      <View style={styles.sectionLoginForm}>
        <Text style={styles.sectionTitle}>Welcome back</Text>
        <Text style={styles.sectionText}>Please login to continue</Text>
        <Jarak height={25} />

        <View>
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
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sectionRegisterAccount}>
        <Text style={styles.titleText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

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
    marginTop: responsiveHeight(160),
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
