import React, { type JSX, useState } from "react";
import { StyleSheet, View, TextInput, Pressable, Platform } from "react-native";
import { useSetRecoilState } from "recoil";
import {  errorState} from "../../hooks/useErrorHandling";
import { FontAwesome} from "@expo/vector-icons";
import {SmallText} from "../Texts/SmallText";
import { newColors as Colors } from "../../constants/colors";
import { handleValidation } from "../../utils/Validator";
import { type textInputType } from "../../types";
import { LeftIcon, RightIcon } from "../Icons/Icons";
///////////////////////////////////////////////////////////////////////////////////////////////////
export const MyTextInput:React.FC<textInputType> = ({
  name,
  label,
  iconName,
  isPassword,
  isDecimal,
  onValueChange,
  width=200,
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
  const setError = useSetRecoilState(errorState);

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
    const errMessage = handleValidation(value, validation)
    setErrors(errMessage)
    setError({
      message: errMessage||'',
      type: "validation"
    });
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
              color={Colors[theme ? theme : "dark"].icon_color}            />
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
            style={[styles.inputText,{width:width-20},{backgroundColor: inputBackgroundColor}]}
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

// export default MyTextInput;

const styles = StyleSheet.create({
  inputField: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderTopEndRadius: 10,

    margin: 5,
  },
  leftIcon: {
    padding: 1,
  },
  rightIcon: {
    position: "absolute",
    top: 25,
    right: 15,
    zIndex: 1,
  },
  textInput: {
    height: 50,
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
    borderWidth: 1,
    alignItems:"center",
    paddingRight: 15,

       // Schatten für iOS
       shadowColor: '#000',
       shadowOffset: { width: 5, height: 5 },
       shadowOpacity: 0.3,
       shadowRadius: 10,
       // Schatten für Android
       elevation: 10,
  },
  error: {
    color: "red",
  },
});
