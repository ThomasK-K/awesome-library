import React, { useState } from 'react';
import type {  JSX, ReactNode} from "react";
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { newColors as Colors } from '../../constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import type {themeType} from "../../types";

export type rightIconType = {
  handlePassword: () => void;
  theme?: themeType;
};
export type IconType = {
  theme?: themeType;
  style?: any;
  children: ReactNode;
};
// #################################################
export const Icon:React.FC< IconType> = ({ style, children }: IconType) => {
  return <View style={[[styles.Icon, style]]}>{children}</View>;
};
// #################################################
export const LeftIcon:React.FC< IconType> = ({ children }: IconType): JSX.Element => {
  return <View style={[[styles.leftIcon]]}>{children}</View>;
};
// #################################################
export const RightIcon = ({
  handlePassword,
  theme,
  ...props
}: rightIconType): JSX.Element => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const {}= {...props}
  const handlePress = () => {
    setHidePassword(!hidePassword);
    handlePassword();
  };

  return (
    <TouchableOpacity style={[styles.rightIcon]} onPress={handlePress}>
      <FontAwesome
        name={hidePassword ? 'eye-slash' : 'eye'}
        size={20}
        color={Colors[theme ? theme : 'dark'].icon_color}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  leftIcon: {
    padding: 10,
  },
  Icon: {
    padding: 0,
    justifyContent: 'center',
  },
  rightIcon: {
    position: 'absolute',
    top: 25,
    right: 15,
    zIndex: 1,
  },
});
