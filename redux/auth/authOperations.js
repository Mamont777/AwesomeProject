import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/config";

export const authSignUpUser =
  ({ login, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignInUser = () => async (dispatch, getState) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error.message);
  }
};

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};

export const authStateChange = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
  });
};
