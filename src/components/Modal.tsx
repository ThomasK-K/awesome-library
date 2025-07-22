import { StyleSheet, View, Modal, type ModalProps } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from './Buttons/Button';
import { newColors as Colors } from '../constants/colors';
import { SmallText } from '../components/Texts/SmallText';
import { useRecoilValue } from 'recoil';
import { errorState, type ErrorStateType } from '../hooks/useErrorHandling';
///////////////////////////////////////////////////

type ModalProp = {
  buttonLabel: string;
  theme?: 'light' | 'dark';
  onClose: (action: string) => void;
  animationType?: string;
  visible: boolean;
} & ModalProps;

export const ModalComponent: React.FC<
  { children?: JSX.Element[] } & ModalProp
> = ({
  buttonLabel,
  onClose,
  theme,
  children,
  animationType = 'slide',
  visible,
}: { children?: JSX.Element[] } & ModalProp): JSX.Element => {
  const [disabled, setDisabled] = useState(true);
  const errorObject: ErrorStateType = useRecoilValue(errorState);
  useEffect(() => {
    const resArr = Object.values(errorObject).filter((val) => {
      if (!(val === null || val === 'validation')) {
        return val;
      }
      return;
    });
    resArr.length === 0 ? setDisabled(false) : setDisabled(true);
  }, [errorObject]);

  return (
    <Modal
      style={[styles.modalContent]}
      visible={visible}
      animationType={animationType} // Animationstyp: slide, fade, none
      transparent // Modal ist transparent
      onRequestClose={() => onClose('Cancel')}
      // Schließt das Modal, wenn der Benutzer zurückgeht (Android)
    >
      <View
        style={[
          { backgroundColor: Colors[theme ? theme : 'dark'].background95 },
          { boxShadow: Colors[theme ? theme : 'dark'].borderShadow },
          styles.modalbox
        ]}
      >
        <View>
          {children}
          {/* Button zum Schließen des Modals */}
          <SmallText style={{ color: 'red' }}>{` `}</SmallText>
          <View style={styles.buttonSet}>
            <Button
              label={buttonLabel}
              disabled={disabled}
              onClick={() => onClose('Save')}
            />
            <Button label={'Cancel'} onClick={() => onClose('Cancel')} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Stile
const styles = StyleSheet.create({
  modalContent: {
  

  },
  modalbox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 500,
    height: 500,
    borderRadius: 10,
    alignContent: 'center',
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // Schatten für Android
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonSet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
