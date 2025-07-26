import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MySwitch } from '../components/Switch';

describe('MySwitch Component', () => {
  it('renders correctly with default props', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <MySwitch 
        name="testSwitch" 
        onValueChange={onValueChange} 
        testID="switch-test"
      />
    );
    
    expect(getByTestId('switch-test')).toBeTruthy();
  });

  it('renders with label in different positions', () => {
    const onValueChange = jest.fn();
    const { rerender, getByText } = render(
      <MySwitch 
        name="testSwitch" 
        label="Left Label"
        labelPosition="left"
        onValueChange={onValueChange} 
      />
    );
    
    expect(getByText('Left Label')).toBeTruthy();
    
    rerender(
      <MySwitch 
        name="testSwitch" 
        label="Right Label"
        labelPosition="right"
        onValueChange={onValueChange} 
      />
    );
    
    expect(getByText('Right Label')).toBeTruthy();
    
    rerender(
      <MySwitch 
        name="testSwitch" 
        label="Top Label"
        labelPosition="top"
        onValueChange={onValueChange} 
      />
    );
    
    expect(getByText('Top Label')).toBeTruthy();
    
    rerender(
      <MySwitch 
        name="testSwitch" 
        label="Bottom Label"
        labelPosition="bottom"
        onValueChange={onValueChange} 
      />
    );
    
    expect(getByText('Bottom Label')).toBeTruthy();
  });

  it('calls onValueChange when pressed', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <MySwitch 
        name="testSwitch" 
        onValueChange={onValueChange} 
        testID="switch-test"
      />
    );
    
    fireEvent.press(getByTestId('switch-test'));
    
    expect(onValueChange).toHaveBeenCalledWith('testSwitch', true);
  });

  it('does not call onValueChange when disabled', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <MySwitch 
        name="testSwitch" 
        disabled={true}
        onValueChange={onValueChange} 
        testID="switch-test"
      />
    );
    
    fireEvent.press(getByTestId('switch-test'));
    
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
