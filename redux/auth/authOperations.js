import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import {
  authSignOut,
  authStateChange,
  updateUserProfile,
  updateAvatar,
  authError,
} from "./authReducer";

export const authSignUpUser =
  ({ login, email, password, avatar }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatar,
      });

      const { uid, displayName, photoURL } = auth.currentUser;
      const userEmail = auth.currentUser.email;

      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
          email: userEmail,
          avatar: photoURL,
        })
      );
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

export const authSignOutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log(error.message);
  }
};

export const AuthStateChangeUser = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email, photoURL } = auth.currentUser;

      if (displayName && photoURL) {
        dispatch(
          updateUserProfile({
            userId: uid,
            login: displayName,
            email,
            avatar: photoURL,
          })
        );
      }

      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export const updateUserAvatar = (avatar) => async (dispatch) => {
  if (auth.currentUser) {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: avatar,
      });

      const { photoURL } = auth.currentUser;

      dispatch(updateAvatar({ avatar: photoURL }));
    } catch (error) {
      dispatch(authError(error.message));
    }
  }
};
