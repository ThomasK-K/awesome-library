import { Text, View } from 'react-native'
import React from 'react'

export type TextProps = {
  children:React.ReactNode
}
export const MyText = () => {
  return (
    <View>
      <Text>MyText is ...</Text>
    </View>
  )
}

export const BigText: React.FC<TextProps> = (props) => {
  return (
    <Text>
      {props.children}
    </Text>
  );
};



