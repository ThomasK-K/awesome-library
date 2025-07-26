import React, { useState, useEffect } from 'react';
import { Switch, View, StyleSheet, Platform, Pressable, ViewStyle, TextStyle, ColorValue } from 'react-native';
import { newColors as Colors } from '../constants/colors';
import { SmallText } from './Texts/SmallText';

type SwitchType = {
  label?: string;
  name: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  switchStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  onValueChange: (name: string, value: boolean) => void;
  initialValue?: boolean;
  disabled?: boolean;
  trackColor?: {
    false?: ColorValue;
    true?: ColorValue;
  };
  thumbColor?: {
    false?: ColorValue;
    true?: ColorValue;
  };
  theme?: 'light' | 'dark' | 'custom';
  ios_backgroundColor?: ColorValue;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  testID?: string;
};
export const MySwitch: React.FC<SwitchType> = ({
  name,
  label,
  style,
  labelStyle,
  switchStyle,
  containerStyle,
  onValueChange,
  initialValue = false,
  disabled = false,
  trackColor = { false: Colors.sw_false, true: Colors.sw_true },
  thumbColor,
  theme = 'light',
  ios_backgroundColor = "#3e3e3e",
  labelPosition = 'left',
  testID,
}) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  
  // Sync with external value if it changes
  useEffect(() => {
    setIsEnabled(initialValue);
  }, [initialValue]);
  
  const handleChange = (fieldname: string) => {
    if (disabled) return;
    
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    onValueChange(fieldname, newValue);
  };
  
  // Calculate thumb color based on state and props
  const getThumbColor = () => {
    if (disabled) return '#D3D3D3'; // Light gray for disabled state
    
    if (thumbColor) {
      return isEnabled ? thumbColor.true : thumbColor.false;
    }
    
    return isEnabled ? Colors.sw_thumb_enabled : Colors.sw_thumb_disabled;
  };
  
  // Get theme-specific text color
  const getTextColor = (): TextStyle => {
    switch (theme) {
      case 'dark':
        return { color: '#FFFFFF' };
      case 'light':
        return { color: '#000000' };
      default:
        return {}; // Custom theme handled via labelStyle
    }
  };
  
  // Build container style based on label position
  const containerStyleArray: any[] = [styles.container];
  
  // Add custom container style if provided
  if (containerStyle) {
    containerStyleArray.push(containerStyle);
  }
  
  // Add layout styles based on label position
  switch (labelPosition) {
    case 'right':
      containerStyleArray.push({ flexDirection: 'row-reverse' });
      break;
    case 'top':
      containerStyleArray.push({ flexDirection: 'column' });
      break;
    case 'bottom':
      containerStyleArray.push({ flexDirection: 'column-reverse' });
      break;
    case 'left':
    default:
      containerStyleArray.push({ flexDirection: 'row' });
  }
  
  // Add disabled styling
  if (disabled) {
    containerStyleArray.push({ opacity: 0.7 });
  }
  
  // Render label if provided
  const renderLabel = () => {
    if (!label) return null;
    
    const labelStyleArray = [
      styles.label,
      getTextColor(),
      labelStyle,
    ];
    
    if (disabled) {
      labelStyleArray.push({ color: '#999999' });
    }
    
    return (
      <SmallText 
        theme={theme === 'custom' ? 'light' : theme}
        style={labelStyleArray}
      >
        {label}
      </SmallText>
    );
  };
  
  // Render the component
  return (
    <View style={containerStyleArray}>
      <Pressable 
        onPress={() => handleChange(name)} 
        disabled={disabled}
        style={[{ padding: 5, flexDirection: 'row', alignItems: 'center' }, style]}
        testID={testID}
      >
        {renderLabel()}
        <Switch
          style={[styles.switch, switchStyle]}
          trackColor={trackColor}
          thumbColor={getThumbColor()}
          ios_backgroundColor={ios_backgroundColor}
          onValueChange={() => handleChange(name)}
          value={isEnabled}
          disabled={disabled}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  label: {
    marginTop: Platform.select({
      ios: 0,
      android: 5,
      default: 3,
    }),
    marginHorizontal: 6,
    marginVertical: 4,
    flexShrink: 1,
  },
  switch: {
    marginTop: 0,
  },
});
