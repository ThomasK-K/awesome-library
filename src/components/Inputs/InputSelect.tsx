import React, { type JSX, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { LeftIcon } from '../Icons/Icons';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SmallText } from '../Texts/SmallText';
import { newColors as Colors } from '../../constants/colors';
import { type inputSelectProps } from '../../types';
import { handleValidation } from '../../utils/Validator';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { errorState, type ErrorStateType } from '../../hooks/useErrorHandling';

export const InputSelect: React.FC<inputSelectProps> = ({
  isDecimal,
  iconName,
  width,
  label,
  valueList,
  validation,
  name,
  onValueChange,
  theme,
  ...props
}): JSX.Element => {
  const [inputBackgroundColor, setInputBackgroundColor] = useState(
    Colors[theme ? theme : 'dark'].bg_input
  );
  const [value, setValue] = useState('');
  const [errors, setFieldError] = useState('');
  const setError = useSetRecoilState(errorState);
  const errorRecoil = useRecoilState(errorState);

  const customOnFocus = () => {
    setInputBackgroundColor(Colors[theme ? theme : 'dark'].focus_input);
    // setErrors(handleValidation(value, validation));
    console.log('##### handle Focus');
    setFieldError('');
  };

  const customOnBlur = () => {
    setInputBackgroundColor(Colors[theme ? theme : 'dark'].bg_input);
    console.log('##### handle Blur');
    const errMessage = handleValidation(value, validation);
    setFieldError(errMessage);
    const newError: ErrorStateType = {
      ...(errorRecoil[0] as ErrorStateType),
      [name]: errMessage,
      type: 'validation',
    };
    setError(newError);
  };
  const handleSelect = (fieldname: string, fieldvalue: string) => {
    setValue(fieldvalue);
    onValueChange(fieldname, fieldvalue);
    console.log('##### handleChange', fieldvalue);
    const errMessage = handleValidation(fieldvalue, validation);
    setFieldError(errMessage);
    const newError: ErrorStateType = {
      ...(errorRecoil[0] as ErrorStateType),
      [name]: errMessage,
      type: 'validation',
    };
    setError(newError);
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: Colors[theme ? theme : 'dark'].border_color,
          backgroundColor: Colors[theme ? theme : 'dark'].bg_input,
        },
      ]}
    >
      <LeftIcon>
        <MaterialCommunityIcons
          name={iconName ?? 'filter'}
          size={30}
          style={[]}
        />
      </LeftIcon>
      <View
        style={[
          styles.textInput,
          {
            width: width,
          },
        ]}
      >
        <SmallText theme={theme}>{label}</SmallText>
        <Picker
          {...props}
          style={[
            styles.pickerStyle,
            { backgroundColor: inputBackgroundColor },

            props.style,
          ]}
          onFocus={customOnFocus}
          onBlur={customOnBlur}
          selectedValue={value}
          onValueChange={(itemValue) => handleSelect(name, itemValue)}
        >
          {valueList &&
            valueList.map((val, index) => {
              return <Picker.Item label={val} key={index} value={val} />;
            })}
        </Picker>
        {errors && <SmallText style={[styles.error]}>{errors}</SmallText>}
      </View>
    </View>
  );
};

// export default InputSelect;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.bg_input,
    borderBottomWidth: 2,
    borderTopEndRadius: 10,
    borderBottomColor: Colors.border_color,
    margin: 5,
  },
  textInput: {
    backgroundColor: Colors.bg_input,

    paddingLeft: 15,
    paddingRight: 15,
    color: Colors.fontcolor,
  },
  pickerStyle: {
    height: Platform.select({
      ios: 0,
      android: 55,
      default: 25,
    }),
    marginLeft: Platform.select({
      ios: 0,
      android: -18,
      default: 0,
    }),
  },
  error: {
    color: 'red',
  },
});
