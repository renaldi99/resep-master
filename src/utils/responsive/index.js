import { Dimensions } from "react-native";
import { heightMobileUI, widthMobileUI } from "../sizeDefault";

export const responsiveWidth = (width) => {
  return (Dimensions.get("window").width * width) / widthMobileUI;
};

export const responsiveHeight = (height) => {
  return (Dimensions.get("window").height * height) / heightMobileUI;
};
