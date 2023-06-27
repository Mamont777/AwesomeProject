import Svg, { Path } from "react-native-svg";
const CrossSvg = (props) => (
  <Svg
    viewBox="0 0 11 11"
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    fill="none"
    {...props}
  >
    <Path
      fill="#BDBDBD"
      fillRule="evenodd"
      d="m1.257.55-.707.707L4.793 5.5.55 9.743l.707.707L5.5 6.207l4.243 4.243.707-.707L6.207 5.5l4.243-4.243L9.743.55 5.5 4.793 1.257.55Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CrossSvg;
