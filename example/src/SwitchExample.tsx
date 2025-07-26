import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch as MySwitch } from 'tkk-rn-component-package';

export const SwitchExample = () => {
  const [values, setValues] = useState({
    switch1: false,
    switch2: true,
    switch3: false,
    switch4: true,
    switch5: false,
  });

  const handleValueChange = (name: string, value: boolean) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
    console.log(`Switch ${name} changed to ${value}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MySwitch Component Examples</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Label Positions</Text>
        
        <MySwitch 
          name="switch1"
          label="Left Label (Default)"
          labelPosition="left"
          onValueChange={handleValueChange}
          initialValue={values.switch1}
          testID="switch1"
        />
        
        <MySwitch 
          name="switch2"
          label="Right Label"
          labelPosition="right"
          onValueChange={handleValueChange}
          initialValue={values.switch2}
          testID="switch2"
        />
        
        <MySwitch 
          name="switch3"
          label="Top Label"
          labelPosition="top"
          onValueChange={handleValueChange}
          initialValue={values.switch3}
          testID="switch3"
        />
        
        <MySwitch 
          name="switch4"
          label="Bottom Label"
          labelPosition="bottom"
          onValueChange={handleValueChange}
          initialValue={values.switch4}
          testID="switch4"
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Themes & States</Text>
        
        <MySwitch 
          name="switch5"
          label="Light Theme (Default)"
          theme="light"
          onValueChange={handleValueChange}
          initialValue={values.switch5}
          testID="switch5"
        />
        
        <MySwitch 
          name="switch5"
          label="Dark Theme"
          theme="dark"
          onValueChange={handleValueChange}
          initialValue={!values.switch5}
          testID="switch6"
          containerStyle={{ backgroundColor: '#333' }}
        />
        
        <MySwitch 
          name="switch5"
          label="Custom Theme"
          theme="custom"
          labelStyle={{ color: 'purple', fontWeight: 'bold' }}
          trackColor={{ false: '#ffccff', true: '#9900cc' }}
          thumbColor={{ false: '#cc99ff', true: '#6600cc' }}
          onValueChange={handleValueChange}
          initialValue={values.switch5}
          testID="switch7"
        />
        
        <MySwitch 
          name="switch5"
          label="Disabled Switch"
          disabled={true}
          onValueChange={handleValueChange}
          initialValue={true}
          testID="switch8"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
});

export default SwitchExample;
