import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import {SmallText} from "../Texts/SmallText";
import { newColors as Colors } from "../../constants/colors";
import type {themeType} from "../../types";

type ButtonType = {
  label: string;
  onClick: () => void;
  theme?: themeType;
  style?: {}
  }

export const Button:React.FC<ButtonType> = ({ label, onClick, theme, ...props }) => {

  const handlePress = () => {
    onClick();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <View
          style={[
            styles.buttonStyle,
            theme ? { backgroundColor: Colors[theme].bg_button } : {},
            props.style
          ]}
          {...props}
        >
          <SmallText
            style={[
              styles.textStyle,
              theme ? { color: Colors[theme].fr_button } : {},
            ]}
          >
            {label}
          </SmallText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// export default Button;

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  buttonStyle: {
    borderRadius: 20,
    backgroundColor: "black",
  },
  textStyle: {
    padding: 10,
    color: "white",
  },
});
