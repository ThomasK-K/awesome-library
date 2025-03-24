import React, { type JSX, useState } from "react";
import { StyleSheet, View, TextInput, Pressable, Platform } from "react-native";

import { FontAwesome} from "@expo/vector-icons";
import {SmallText} from "../Texts/SmallText";
import { newColors as Colors } from "../../constants/colors";
import { handleValidation } from "../../utils/Validator";
import { type textInputType } from "../../types";
import { LeftIcon, RightIcon } from "../Icons/Icons";
///////////////////////////////////////////////////////////////////////////////////////////////////
const MyTextInput:React.FC<textInputType> = ({
  name,
  label,
  iconName,
  isPassword,
  isDecimal,
  onValueChange,
  width,
  validation,
  theme,
  ...props
}): JSX.Element => {
  const [inputBackgroundColor, setInputBackgroundColor] = useState(
    Colors[theme?theme:"dark"].bg_input
  );
  const [hidePassword, setHidePassword] = useState(true);
  const [_, sethasFocus] = useState<boolean>(false);
  const [placeh, setPlaceh] = useState<string | null>(null);
  const [value, setvalue] = useState("");
  const [onPress, setOnPress] = useState(false);
  const [errors, setErrors] = useState("");
// dummy
  const {}={...props}

  const handlePress = () => {
    setErrors("");
    setInputBackgroundColor(
      theme ? Colors[theme]?.focus_input : Colors.focus_input
    );
    sethasFocus(true);
    setOnPress(true);
    if (value === "" || null) {
      setPlaceh(" ");
    } else {
      setPlaceh(label || null);
    }
    console.log("#  handlePress ####", placeh, onPress);
  };
  //////////////////////////////////////////////////////
  const handleChange = (fieldname: string, fieldvalue: string) => {
    if (fieldvalue === "") setPlaceh("...");
    onValueChange(fieldname, fieldvalue);
    setvalue(fieldvalue);
  };
  ////////////////////////////////////////////////////////
  const handleBlur = () => {
    // sethasFocus(false)
    setInputBackgroundColor(theme ? Colors[theme].bg_input : Colors.bg_input);
    if (value === "" || null) {
      sethasFocus(false);
      setPlaceh(" ");
    }
    setErrors(handleValidation(value, validation));
    setOnPress(false);
  };
  return (
    <View>
      <Pressable
        style={[
          styles.inputField,
           { backgroundColor: Colors[theme ? theme : "dark"].bg_input },
          { borderBottomColor: Colors[theme ? theme : "dark"].border_color },
        ]}
        onPressIn={handlePress}
        onBlur={handleBlur}
      >
        <LeftIcon theme={theme}>
          {isDecimal ? (
            <FontAwesome
              name="euro"
              size={30}
              color={Colors[theme ? theme : "dark"].icon_color}
            />
          ) : (
            <FontAwesome
              // name={icon?icon:"filter"}
              name={iconName??"filter" }
              size={30}
              color={Colors[theme ? theme : "dark"].icon_color}
            />
          )}
        </LeftIcon>
        <View
          style={[
            styles.textInput,
            {
              backgroundColor: inputBackgroundColor,
              width: width,
            },
          ]}
        >
          <SmallText theme={theme}>{label}</SmallText>
          <TextInput
            style={[styles.inputText,{backgroundColor: inputBackgroundColor}]}
            // placeholder={placeh ? placeh : props.placeholder}
            value={value}
            onChangeText={(val) => handleChange(name, val)}
            secureTextEntry={isPassword && hidePassword}
            keyboardType={isDecimal ? "numeric" : "default"}
            onFocus={handlePress}
            onBlur={handleBlur}
          />
        </View>
        {isPassword && (
          <RightIcon
            handlePassword={() => setHidePassword(!hidePassword)}
            theme={theme}
          />
        )}
      </Pressable>
      {errors && <SmallText style={[styles.error]}>{errors}</SmallText>}
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  inputField: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderTopEndRadius: 10,

    margin: 5,
  },
  leftIcon: {
    padding: 10,
  },
  rightIcon: {
    position: "absolute",
    top: 25,
    right: 15,
    zIndex: 1,
  },
  textInput: {
    height: 50,
    width: 100,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
  },
  inputText: {
    marginTop: Platform.select({
      ios: 0,
      android: 0,
      default: 10,
    }),
  },
  error: {
    color: "red",
  },
});
