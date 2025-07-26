import type { ReactNode } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; // Replace with the correct type or remove if unused
// fot the theme switcher
export type themeType = 'dark' | 'light';

export interface TextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  theme?: themeType;
}
export type textInputType = {
  //   icon?: IconProps<string>
  name: string;
  iconName?: keyof typeof FontAwesome.glyphMap;
  label: string;
  val?: string | number;
  isPassword?: boolean;
  isDecimal?: boolean;
  onValueChange: (name: string, value: string) => void;
  validation?: {
    type?:
      | 'email'
      | 'numeric'
      | 'password'
      | 'url'
      | 'phone'
      | 'ipAdress'
      | 'decimal';
    required?: true;
  };
  width?: number;
  containerStyle?: object;
  labelStyle?: object;
  inputStyle?: object;
  errorTextStyle?: object;
  theme?: 'light' | 'dark';
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url';
  showErrorIcon?: boolean;
  props?: {};
};
// Enhanced types
export type ThemeColors = {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  placeholderColor?: string;
  selectedBackgroundColor?: string;
  disabledBackgroundColor?: string;
};
export interface inputSelectProps {
  items: SelectItem[];
  enabled?: boolean;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  label?: string;
  name: string;
  accessibilityLabel?: string;
  onValueChange: (name: string, value: string) => void;
  width?: number;
  placeholder?: string;
  themeColors?: ThemeColors;
  containerStyle?: object;
  groupedItems?: Array<{ label: string; items: SelectItem[] }>;
  renderItem?: (item: SelectItem) => React.ReactNode;
  labelStyle?: object;
  inputStyle?: object;
  pickerStyle?: object;
  errorTextStyle?: object;
  theme?: 'light' | 'dark' | 'custom';
  val?: string | number;
  validation?: {
    type?: 'email' | 'numeric' | 'required';
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    customValidator?: (value: string | number) => string | null;
  };
  labelPosition?: 'top' | 'left' | 'inside' | 'floating';
  showErrorIcon?: boolean;
  dropdownStyle?: object;
  webSelectProps?: object;
  nativeSelectProps?: object;
  props?: object;
}
export type SelectItem = {
  value: string | number;
  label:string
};
