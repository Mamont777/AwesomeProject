import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "../router";
import { AuthStateChangeUser } from "../redux/auth/authOperations";

const Main = ({ onLayoutRootView }) => {
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      {routing}
    </NavigationContainer>
  );
};

export default Main;
