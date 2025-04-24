import React, { type JSX, useState } from 'react';
import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import { SmallText } from '../Texts/SmallText';
import { handleValidation } from '../../utils/Validator';
import { type textInputType } from '../../types';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { errorState, type ErrorStateType } from '../../hooks/useErrorHandling';
///////////////////////////////////////////////////////////////////////////////////////////////////
export const MyTextInput: React.FC<textInputType> = ({
  name,
  label,
  isDecimal,
  onValueChange,
  validation,
  theme,
  style,

 
}): JSX.Element => {
  // const [hidePassword, _] = useState(true);
  // const [placeh,setPlaceh] = useState<string | null>(null);
  const [value, setvalue] = useState('');
  const [errors, setFieldError] = useState('');
  const setError = useSetRecoilState(errorState);
  const errorRecoil = useRecoilState(errorState);


  const customOnFocus = () => {
    setFieldError('');
  };
  //////////////////////////////////////////////////////
  const handleChange = (fieldname: string, fieldvalue: string) => {
    onValueChange(fieldname, fieldvalue);
    setvalue(fieldvalue);
    const errMessage = handleValidation(value, validation);
    setFieldError(errMessage);
    const newError: ErrorStateType = {
      ...(errorRecoil[0] as ErrorStateType),
      [name]: errMessage,
      type: 'validation',
    };
    setError(newError);
  };
  ////////////////////////////////////////////////////////
  const customOnBlur = () => {
    // sethasFocus(false)
    // setInputBackgroundColor(theme ? Colors[theme].bg_input : Colors.bg_input);
    if (value === '' || null) {
      // sethasFocus(false);
      // setPlaceh(' ');
    }
    const errMessage = handleValidation(value, validation);
    setFieldError(errMessage);
    const newError: ErrorStateType = {
      ...(errorRecoil[0] as ErrorStateType),
      [name]: errMessage,
      type: 'validation',
    };
    setError(newError);
  };
  return (
    <View style={[styles.container]}>
      <Pressable>
        <View style={[style]}>
          <SmallText theme={theme} style={{
          color: 'black',
      
        }}>{label}</SmallText>
          <TextInput
            // placeholder={placeh ? placeh : props.placeholder}
            style={{
              borderWidth: 1,
              borderColor: errors ? 'red' : '#ccc',
              borderRadius: 10,
              padding: 10,
              backgroundColor: 'white',
              color: 'black',
              width: '100%',
              height: 20,
              fontSize: 12
            }}
            value={value}
            onChangeText={(val) => handleChange(name, val)}
            // secureTextEntry={isPassword && hidePassword}
            keyboardType={isDecimal ? 'numeric' : 'default'}
            onFocus={customOnFocus}
            onBlur={customOnBlur}
          />
        </View>
      </Pressable>
      {errors && <SmallText style={[styles.error]}>{errors}</SmallText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  error: {
    color: 'red', padding:5
  },
});
