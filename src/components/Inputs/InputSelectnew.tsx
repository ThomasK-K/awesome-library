import React, { type JSX, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';
import { BigText } from '../Texts/BigText';
import { SmallText } from '../Texts/SmallText';
import { handleValidation } from '../../utils/Validator';
import { type inputSelectProps, type SelectItem } from '../../types';
import { errorState, type ErrorStateType } from '../../hooks/useErrorHandling';
import { useSetRecoilState, useRecoilState } from 'recoil';

const WebSelect: React.FC<{
  value: string | number | null;
  onValueChange: (_value: string | number) => void;
  items: SelectItem[];
  placeholder?: string;
  style?: any;
  accessibilityLabel?: string;
  enabled?: boolean;
}> = ({
  value,
  onValueChange,
  items,
  placeholder,
  style,
  accessibilityLabel,
  enabled = true,
}): JSX.Element => {
  return (
    <select
      value={value ?? ''}
      onChange={(e: React.ChangeEvent<any>) => {
        const selectedItem = items.find(
          (item) => item.value.toString() === e.currentTarget.value
        );
        if (selectedItem) {
          onValueChange(selectedItem.value);
        }
      }}
      style={{
        ...styles.webSelect,
        ...style,
        opacity: enabled ? 1 : 0.6,
        cursor: enabled ? 'pointer' : 'not-allowed',
      }}
      aria-label={accessibilityLabel}
      disabled={!enabled}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {items.map((item) => (
        <option key={item.value} value={item.value.toString()}>
          {item.value}
        </option>
      ))}
    </select>
  );
};

export const CrossPlatformPicker: React.FC<inputSelectProps> = ({
  items,
  label,
  name,
  onValueChange,
  placeholder,
  style,
  accessibilityLabel,
  enabled = true,
  validation = {
    required: true,
  },
}) => {
  const [value, setValue] = useState('');
  const [errors, setFieldError] = useState('');
  const setError = useSetRecoilState(errorState);
  const errorRecoil = useRecoilState(errorState);

  const handleSelect = (fieldname: string, fieldvalue: string) => {
    setValue(fieldvalue);
    onValueChange(fieldname, fieldvalue);
    console.log('##### handleChange', fieldname, fieldvalue);
    const errMessage = handleValidation(fieldvalue, validation);
    setFieldError(errMessage);
    const newError: ErrorStateType = {
      ...(errorRecoil[0] as ErrorStateType),
      [name]: errMessage,
      type: 'validation',
    };
    setError(newError);
  };

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, style]}>
        <WebSelect
          value={value}
          onValueChange={(itemValue) =>
            handleSelect(name, itemValue.toString())
          }
          items={items}
          placeholder={placeholder}
          style={style}
          accessibilityLabel={accessibilityLabel}
          enabled={enabled}
        />
      </View>
    );
  }
  return (
    <View style={[styles.container, style, !enabled && styles.disabled]}>
      <BigText
        style={{
          color: 'black',
          marginBottom: -20,
          margin: 10,
          width: '80%',
          alignItems: 'center',
        }}
      >
        {label}
      </BigText>
      <RNPicker
        selectedValue={value ?? undefined}
        onValueChange={(itemValue) => handleSelect(name, itemValue.toString())}
        style={styles.picker}
        accessibilityLabel={accessibilityLabel}
        enabled={enabled}
      >
        {label && <RNPicker.Item label={label} value={null} enabled={false} />}
        {items.map((item) => (
          <RNPicker.Item key={item.value} label={name} value={item.value} />
        ))}
      </RNPicker>
      {errors && <SmallText style={[styles.error]}>{errors}</SmallText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  picker: {
    width: '100%',
    height: 50,
    color: 'black',
  },
  webSelect: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: 'white',
    cursor: 'pointer',
    ...(Platform.OS === 'web' ? { outline: 'none' } : {}),
  },
  disabled: {
    opacity: 0.6,
  },
  error: {
    color: 'red',
  },
});
