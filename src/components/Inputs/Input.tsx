import React, { type JSX, useState,useEffect } from 'react';
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
  keyboardType,
  onValueChange,
  validation,
  theme,
  containerStyle,
  labelStyle,
  inputStyle,
  errorTextStyle,
  val,
  showErrorIcon = true,
}): JSX.Element => {
  // const [hidePassword, _] = useState(true);
  // const [placeh,setPlaceh] = useState<string | null>(null);
   const [internalValue, setInternalValue] = useState<string | number>(
      val !== undefined ? val : ''
  );
  // const [value, setvalue] = useState<string | number>(val || '');
  const [errors, setFieldError] = useState('');
  const setError = useSetRecoilState(errorState);
  const errorRecoil = useRecoilState(errorState);
   const isControlled = val !== undefined;

   // Sync with external value
     useEffect(() => {
       if (isControlled && val !== internalValue) {
         setInternalValue(val);
       }
     }, [val, isControlled]);

  const customOnFocus = () => {
    setFieldError('');
  };
  //////////////////////////////////////////////////////
  const handleChange = (fieldname: string, fieldvalue: string) => {
    // Always call callback if provided
    onValueChange(fieldname, fieldvalue);
       // Always update internal state for uncontrolled component
    if (!isControlled) {
      setInternalValue(fieldvalue);
    }
    // Validate
    validateInput(fieldvalue);
  };

  const validateInput = (value: string | number) => {
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
  
    const errMessage = handleValidation(internalValue, validation);
    setFieldError(errMessage);
    const newError: ErrorStateType = {
      ...(errorRecoil[0] as ErrorStateType),
      [name]: errMessage,
      type: 'validation',
    };
    setError(newError);
  };
   // Get the display value
  const displayValue =
    internalValue !== undefined && internalValue !== null
      ? String(internalValue)
      : '';
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable>
        <View style={[styles.inputWrapper]}>
          <SmallText theme={theme} style={[styles.label, labelStyle]}>
            {label}
          </SmallText>
          <TextInput
            // placeholder={placeh ? placeh : props.placeholder}
            style={[
              styles.input,
              errors ? styles.errorInput : undefined,
              inputStyle,
            ]}
            value={displayValue}
            onChangeText={(val) => handleChange(name, val)}
            // secureTextEntry={isPassword && hidePassword}
            keyboardType={ keyboardType}
            onFocus={customOnFocus}
            onBlur={customOnBlur}
          />
        </View>
      </Pressable>
      {/* {errors && <SmallText style={[styles.error]}>{errors}</SmallText>} */}

      {/* Error Message */}
      {errors && (
        <View style={styles.errorContainer}>
          {showErrorIcon && <SmallText style={styles.errorIcon}>⚠️</SmallText>}
          <SmallText
            style={[
              styles.error,
              theme === 'dark' && styles.darkError,
              errorTextStyle,
            ]}
          >
            {errors}
          </SmallText>
        </View>
      )}
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
  inputWrapper: {
    width: '100%',
  },
  label: {
    color: 'black',
    marginLeft: 10,
    marginBottom: 0,
    fontWeight: '500',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 5,
    padding: 5,
    backgroundColor: 'white',
    color: 'black',
    width: '95%',
    fontSize: 16,
    minHeight: 40,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 5,
  },

  // error: {
  //   color: 'red',
  //   padding: 5,
  // },
  error: {
    color: 'red',
    fontSize: 12,
    flex: 1,
  },
  darkError: {
    color: '#ff6b6b',
  },
  errorIcon: {
    marginRight: 4,
    fontSize: 12,
  },
});
