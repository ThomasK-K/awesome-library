import React from "react";
import { Text, StyleSheet } from "react-native";
import { newColors as Colors } from "../../constants/colors";
import type { TextProps } from "../../types";

export const BigText: React.FC<TextProps> = (props) => {
  return (
    <Text
      style={[
        styles.testStyle,
        { color: Colors[props.theme ? props.theme : "dark"].icon_color },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  testStyle: { fontSize: 20, color: "black", textAlign: "left" },
});
