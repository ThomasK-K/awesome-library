import React, { useState } from 'react';
import { Switch, View, StyleSheet, Platform } from 'react-native';
import { newColors as Colors } from '../constants/colors';
import { SmallText } from './Texts/SmallText';

type SwitchType = {
  label: string;
  name: string;
  onValueChange: (name: string, value: boolean) => void;
};
export const MySwitch: React.FC<SwitchType> = ({
  name,
  label,
  onValueChange,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const handleChange = (fieldname: string) => {
    setIsEnabled((previousState) => !previousState);
    onValueChange(fieldname, !isEnabled);
  };
  return (
    <View style={[styles.container]}>
      <SmallText theme='light' style={[styles.label]}>{label}</SmallText>
      <Switch
        style={[styles.switch]}
        trackColor={{ false: Colors.sw_false, true: Colors.sw_true }}
        thumbColor={
          isEnabled ? Colors.sw_thumb_enabled : Colors.sw_thumb_disabled
        }
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => handleChange(name)}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  label: {
    marginTop: Platform.select({
      ios: 0,
      android: 15,
      default: 3,
    }),
    marginRight: 6,
  },
  switch: {
    marginTop: 0,
  },
});
