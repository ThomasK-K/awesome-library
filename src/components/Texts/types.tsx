import type { ReactNode } from 'react';
import type { StyleProp, TextStyle } from 'react-native';

type themeType = "dark" | "light";

export interface TextProps {
    children: ReactNode
    style?: StyleProp<TextStyle>;
    theme?: themeType;
}

