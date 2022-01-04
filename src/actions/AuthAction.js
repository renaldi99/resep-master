import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { storeData } from "../utils";

export const REGISTER_USER = "REGISTER_USER";

export const registerUser = (data, password) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, data.email, password)
      .then((success) => {
        // Signed in
        const newDataUser = {
          ...data,
          uid: success.user.uid,
        };

        // simpan ke database
        const db = getDatabase();
        set(ref(db, "users/" + success.user.uid), newDataUser);

        // success
        dispatch({
          type: REGISTER_USER,
          payload: {
            loading: false,
            data: newDataUser,
            errorMessage: false,
          },
        });

        // simpan ke local storage
        storeData("user", newDataUser);
        navigation.replace("MainApp");
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
