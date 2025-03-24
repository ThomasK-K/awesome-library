import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { newColors as Colors } from "../../constants/colors";
import { Icon } from "../Icons/Icons";
import { FontAwesome } from "@expo/vector-icons";
import type {themeType} from "../../types";

type ButtonType = {
  label: keyof typeof icons;
  onClick: (label: keyof typeof icons) => void;
  theme?: themeType;
};

const icons = {
delete:"trash-o",
edit:"edit",
new:"plus",
default:"eye"
}
const getIconName = (label: keyof typeof icons) => icons[label] ? icons[label] : icons.default;

// #################################################
export const IconButton:React.FC<ButtonType> = ({ label, onClick, theme, ...props }) => {
  //
  const handlePress = () => {
    onClick(label);
   
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress()}>
        <View
          style={[
            styles.buttonStyle,
            theme ? { backgroundColor: Colors[theme].bg_button } : {},
          ]}
          {...props}
        >
          <Icon theme={theme} style={{ paddingHorizontal: 1 }}>
            <FontAwesome
              name={getIconName(label) as keyof typeof FontAwesome.glyphMap}
              size={15}
              color={Colors[theme ? theme : "dark"].icon_color}
            />
          </Icon>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// export default IconButton;

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
