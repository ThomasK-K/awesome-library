import { StyleSheet, View, Pressable } from "react-native";
import React from "react";
import {SmallText} from "../Texts/SmallText";
import { newColors as Colors } from "../../constants/colors";
import type {themeType} from "../../types";

type ButtonType = {
  label: string;
  onClick: () => void;
  theme?: themeType;
  style?: {}
  disabled?:boolean
  }

export const Button:React.FC<ButtonType> = ({ label, disabled, onClick, theme, ...props }) => {

  const handlePress = () => {
    onClick();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}  disabled={disabled}>
        <View
          style={[
            styles.buttonStyle,
            disabled?{backgroundColor: "rgb(179, 174, 174)"}:{ backgroundColor: "black",},
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
      </Pressable>
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
    alignItems:"center"
  },
  textStyle: {
    padding: 10,
    color: "white",
    fontWeight:"bold"
  },
});
