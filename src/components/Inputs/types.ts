import { type IconProps } from "@expo/vector-icons/build/createIconSet";
export type textInputType = {
  icon?: IconProps<string>
  label: string
  isPassword?: boolean;
  isDecimal?: boolean;
  name: string;
  onValueChange: (name: string,value:string) => void;
  width?: number;
  validation?: {
    type?: "email" | "numeric" | "password" | "url" | "phone" | "ipAdress";
    required?: true;
  };
  theme?: "light" | "dark"
  props?: {};
};
export type inputSelectType = {
  icon?: string
  label: string
  name: string;
  isDecimal?: boolean;
  onValueChange: (name: string,value:string) => void;
  width?: number;
  placeholder?:string
  style?:{}
  valueList: string[]   
    validation?: {
    type?: "email" | "numeric" | "password" | "url" | "phone" | "ipAdress";
    required?: true;
  };
  theme?: "light" | "dark"
  props?: {};
};