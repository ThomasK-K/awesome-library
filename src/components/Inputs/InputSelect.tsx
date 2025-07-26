import React, { type JSX, useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';
import { SmallText } from '../Texts/SmallText';
import { handleValidation } from '../../utils/Validator';
import {
  type inputSelectProps,
  type SelectItem,
  type ThemeColors,
} from '../../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Optionaler Import von Recoil - wird nur verwendet, wenn verfügbar
let useRecoilState: any = null;
let useSetRecoilState: any = null;
let errorState: any = null;

try {
  // Dynamischer Import von Recoil und errorHandling
  const recoil = require('recoil');
  const errorHandling = require('../../hooks/useErrorHandling');

  useRecoilState = recoil.useRecoilState;
  useSetRecoilState = recoil.useSetRecoilState;
  errorState = errorHandling.errorState;
} catch (error) {
  console.log('Recoil nicht verfügbar, lokaler Zustand wird verwendet');
}

const WebSelect: React.FC<{
  value: string | number | null;
  onValueChange: (_value: string | number | any) => void; // Updated to match how it's called
  items: SelectItem[];
  placeholder?: string;
  style?: any;
  dropdownStyle?: any;
  accessibilityLabel?: string;
  enabled?: boolean;
  themeColors?: ThemeColors;
  webSelectProps?: object;
  groupedItems?: Array<{ label: string; items: SelectItem[] }>;
}> = ({
  value,
  onValueChange,
  items,
  placeholder,
  style,
  dropdownStyle,
  accessibilityLabel,
  enabled = true,
  themeColors,
  webSelectProps = {},
  groupedItems,
}): JSX.Element => {
  const textColor = themeColors?.textColor || 'black';
  const borderColor = themeColors?.borderColor || '#ccc';
  const backgroundColor = themeColors?.backgroundColor || 'white';
  const placeholderColor = themeColors?.placeholderColor || '#757575';

  const renderOptions = (optionItems: SelectItem[]) => {
    return optionItems.map((item) => (
      <option
        key={item.value}
        value={item.value.toString()}
        style={{ color: textColor, ...dropdownStyle }}
      >
        {item.label || item.value}
      </option>
    ));
  };

  return (
    <select
      value={value ?? ''}
      onChange={(e: React.ChangeEvent<any>) => {
        const selectedValue = e.currentTarget.value;
        console.log('Selected value in WebSelect:', selectedValue);

        // Alle Items durchsuchen (sowohl normale als auch gruppierte)
        const allItems = [...items];
        if (groupedItems) {
          groupedItems.forEach((group) => {
            if (group.items) {
              allItems.push(...group.items);
            }
          });
        }

        // Das ausgewählte Item finden
        const selectedItem = allItems.find(
          (item) => item.value.toString() === selectedValue
        );

        console.log('Found selected item:', selectedItem);

        if (selectedItem && typeof onValueChange === 'function') {
          onValueChange(selectedItem.value);
        }
      }}
      style={{
        ...styles.webSelect,
        ...style,
        color: textColor,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        opacity: enabled ? 1 : 0.6,
        cursor: enabled ? 'pointer' : 'not-allowed',
      }}
      aria-label={accessibilityLabel}
      disabled={!enabled}
      {...webSelectProps}
    >
      {placeholder && (
        <option value="" disabled hidden style={{ color: placeholderColor }}>
          {placeholder}
        </option>
      )}

      {groupedItems
        ? groupedItems.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {renderOptions(group.items)}
            </optgroup>
          ))
        : renderOptions(items)}
    </select>
  );
};

export const CrossPlatformPicker: React.FC<inputSelectProps> = ({
  items = [],
  label,
  name,
  onValueChange,
  placeholder,
  accessibilityLabel,
  enabled = true,
  containerStyle,
  labelStyle,
  inputStyle,
  pickerStyle,
  errorTextStyle,
  theme = 'light',
  renderItem,
  themeColors,
  groupedItems,
  val,
  validation,
  labelPosition = 'top',
  showErrorIcon = true,
  dropdownStyle,
  webSelectProps,
  nativeSelectProps = {},
  iconName,
}) => {
  // Ensure groupedItems is properly handled
  const hasGroupedItems =
    groupedItems && Array.isArray(groupedItems) && groupedItems.length > 0;

  // Create flattened array from grouped items when available
  const groupedItemsFlattened = hasGroupedItems
    ? groupedItems.flatMap((group) => group.items || [])
    : [];

  // Debug output
  console.log('InputSelectnew Debug:', {
    name,
    platform: Platform.OS,
    itemsLength: items.length,
    hasGroupedItems,
    groupedItemsFlattenedLength: groupedItemsFlattened.length,
    groupedItems: hasGroupedItems ? groupedItems.map((g) => g.label) : [],
  });

  // Use effective items - if items is empty but we have grouped items, use the flattened grouped items
  const effectiveItems = items.length > 0 ? items : groupedItemsFlattened;
  // State for controlled/uncontrolled component pattern
  const [internalValue, setInternalValue] = useState<string | number | null>(
    val !== undefined ? val : ''
  );
  const [errors, setFieldError] = useState('');
  const isControlled = val !== undefined;

  // Optionale Recoil-Integration
  let setError: any = null;
  let errorRecoil: any = [{}];

  if (useSetRecoilState && errorState) {
    try {
      setError = useSetRecoilState(errorState);
      errorRecoil = useRecoilState?.(errorState) || [{}, () => {}];
    } catch (e) {
      // Recoil nicht im Kontext verfügbar, lokaler Zustand wird verwendet
      console.log('Recoil Kontext nicht verfügbar');
    }
  }

  // Synchronize with external value when provided
  useEffect(() => {
    if (isControlled && val !== internalValue) {
      setInternalValue(val);
    }
  }, [val, isControlled]);

  const handleSelect = (fieldname: string, fieldvalue: string) => {
    console.log('HandleSelect called with:', { fieldname, fieldvalue });

    // Update internal state for uncontrolled component
    if (!isControlled) {
      setInternalValue(fieldvalue);
    }

    // Skip empty values from group headers in Android
    if (fieldvalue === 'group_undefined' || fieldvalue === 'undefined') {
      console.log('Skipping invalid value:', fieldvalue);
      return;
    }

    onValueChange(fieldname, fieldvalue);

    // Validate if validation rules exist
    if (validation) {
      validateInput(fieldvalue);
    }
  };

  const validateInput = (value: string | number | null) => {
    if (!validation) return;

    // Convert null to empty string for validation
    const valueToValidate = value === null ? '' : value;
    const errMessage = handleValidation(valueToValidate, validation);
    setFieldError(errMessage);

    // Update global error state wenn Recoil verfügbar
    if (setError) {
      try {
        const newError = {
          ...errorRecoil[0],
          [name]: errMessage,
          type: 'validation',
        };
        setError(newError);
      } catch (e) {
        console.log('Fehler beim Aktualisieren des Recoil-Status', e);
      }
    }
  };

  // Get the current display value
  const displayValue =
    internalValue !== undefined && internalValue !== null ? internalValue : '';

  // Determine label position styling
  const getLabelPositionStyle = () => {
    switch (labelPosition) {
      case 'left':
        return { flexDirection: 'row', alignItems: 'center' } as const;
      case 'floating':
        return { position: 'relative' } as const;
      case 'inside':
        return { position: 'relative' } as const;
      case 'top':
      default:
        return {};
    }
  };

  // Render error component
  const renderError = () => {
    if (!errors) return null;

    return (
      <View style={styles.errorWrapper}>
        {showErrorIcon && <SmallText style={styles.errorIcon}>⚠️</SmallText>}
        <SmallText
          style={[
            styles.error,
            theme === 'dark' && { color: '#ff6b6b' },
            errorTextStyle,
          ]}
        >
          {errors}
        </SmallText>
      </View>
    );
  };

  // Render label component
  const renderLabel = () => {
    if (!label) return null;

    return (
      <SmallText
        theme={theme === 'custom' ? 'light' : theme}
        style={[
          styles.label,
          labelPosition === 'left' && { marginRight: 10, marginBottom: 0 },
          labelPosition === 'floating' && styles.floatingLabel,
          labelPosition === 'inside' && styles.insideLabel,
          labelStyle,
        ]}
      >
        {label}
      </SmallText>
    );
  };

  // Render icon if provided
  const renderIcon = () => {
    if (!iconName) return null;

    return (
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color={themeColors?.textColor || '#333'}
        />
      </View>
    );
  };

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, getLabelPositionStyle(), containerStyle]}>
        {labelPosition !== 'inside' && renderLabel()}

        <View style={styles.inputContainer}>
          {renderIcon()}

          <WebSelect
            value={displayValue}
            onValueChange={(itemValue) =>
              handleSelect(name, itemValue.toString())
            }
            items={effectiveItems}
            placeholder={placeholder}
            style={inputStyle}
            dropdownStyle={dropdownStyle}
            accessibilityLabel={accessibilityLabel}
            enabled={enabled}
            themeColors={themeColors}
            groupedItems={groupedItems}
            webSelectProps={webSelectProps}
          />

          {labelPosition === 'inside' && !displayValue && renderLabel()}
        </View>

        {renderError()}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        getLabelPositionStyle(),
        !enabled && styles.disabled,
        errors && styles.errorContainer,
        themeColors && {
          backgroundColor: themeColors.backgroundColor,
          borderColor: errors ? 'red' : themeColors.borderColor,
        },
        containerStyle,
      ]}
    >
      {labelPosition !== 'inside' && renderLabel()}

      <View style={styles.inputContainer}>
        {renderIcon()}

        <RNPicker
          style={[
            styles.picker,
            { color: themeColors?.textColor || 'black' },
            pickerStyle,
          ]}
          selectedValue={displayValue}
          onValueChange={(itemValue) => {
            console.log(
              'RNPicker selected value:',
              itemValue,
              typeof itemValue
            );

            // Ignoriere Gruppen-Header-Werte (sie beginnen mit 'group_')
            if (
              typeof itemValue === 'string' &&
              itemValue.startsWith('group_')
            ) {
              return;
            }

            // Konvertiere null oder undefined zu leerem String
            const valueToUse =
              itemValue !== null && itemValue !== undefined
                ? itemValue.toString()
                : '';

            // Handle regular selection
            handleSelect(name, valueToUse);
          }}
          accessibilityLabel={accessibilityLabel}
          enabled={enabled}
          prompt={placeholder}
          {...nativeSelectProps}
        >
          {placeholder && (
            <RNPicker.Item label={placeholder} value={null} enabled={false} />
          )}

          {groupedItems && groupedItems.length > 0
            ? // Render grouped items
              groupedItems.map((group) => (
                <React.Fragment key={group.label}>
                  <RNPicker.Item
                    key={`group_${group.label}`}
                    label={`--- ${group.label} ---`}
                    value={`group_${group.label}`}
                    enabled={false}
                    color="#999"
                  />
                  {group.items &&
                    group.items.map((item) =>
                      renderItem ? (
                        renderItem(item)
                      ) : (
                        <RNPicker.Item
                          key={`${item.value}`}
                          label={item.label || `${item.value}`}
                          value={item.value}
                          style={[styles.input, inputStyle]}
                          color={themeColors?.textColor || 'black'}
                        />
                      )
                    )}
                </React.Fragment>
              ))
            : effectiveItems.map((item) => (
                <RNPicker.Item
                  key={`${item.value}`}
                  label={item.label || `${item.value}`}
                  value={item.value}
                  style={[styles.input, inputStyle]}
                  color={themeColors?.textColor || 'black'}
                />
              ))}
        </RNPicker>

        {labelPosition === 'inside' && !displayValue && renderLabel()}
      </View>

      {renderError()}
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  picker: {
    width: '100%',
    height: 50,
    color: 'black',
    flex: 1,
  },
  webSelect: {
  
    marginLeft: 5,
    marginBottom: 5,
      margin: 5,
      padding: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
    cursor: 'pointer',
    flex: 1,
    ...(Platform.OS === 'web' ? { outline: 'none' } : {}),
  },
  disabled: {
    opacity: 0.6,
  },
  error: {
    color: 'red',
    fontSize: 12,
    flex: 1,
  },
  errorIcon: {
    marginRight: 4,
    fontSize: 12,
  },
  label: {
    color: 'black',
    marginBottom: 5,
    marginHorizontal: 10,
    width: '80%',
    fontWeight: '500',
  },
  floatingLabel: {
    position: 'absolute',
    left: 15,
    top: -10,
    zIndex: 1,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    fontSize: 12,
  },
  insideLabel: {
    position: 'absolute',
    left: 15,
    top: '50%',
    marginTop: -10,
    color: '#999',
    zIndex: 0,
  },
  iconContainer: {
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    borderColor: 'red',
  },
  errorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.05)',
  },
});
