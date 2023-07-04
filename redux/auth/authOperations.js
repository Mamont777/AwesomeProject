import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSignOut, authStateChange, updateUserProfile } from "./authReducer";

export const authSignUpUser =
  ({ login, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
      });

      const { uid, displayName } = auth.currentUser;

      dispatch(updateUserProfile({ userId: uid, login: displayName }));
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log(error.message);
  }
};

export const AuthStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName } = auth.currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
