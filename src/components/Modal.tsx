import { StyleSheet, View, Modal, type ModalProps } from 'react-native';
import React from 'react';
import { Button } from './Buttons/Button';
import { newColors as Colors } from '../constants/colors';
import { SmallText } from '../components/Texts/SmallText';
import { useRecoilValue } from 'recoil';
import { errorState } from '../hooks/useErrorHandling';
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
  const error = useRecoilValue(errorState);
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
          styles.modalContainer,
          { backgroundColor: Colors[theme ? theme : 'dark'].background95 },
          { boxShadow: Colors[theme ? theme : 'dark'].borderShadow },
          { width: 500 },
        ]}
      >
        {/* <View
            style={[
              styles.modalContent,
              { backgroundColor: Colors[theme ? theme : "dark"].background40 },
            ]}
          > */}
        <View style={styles.modalbox}>
          {children}
          {/* Button zum Schließen des Modals */}
          <View style={styles.buttonSet}>
            <Button
              label={buttonLabel}
              disabled={error.message?true:false}
              onClick={() => onClose('Save')}
            />
            <Button label={'Cancel'} onClick={() => onClose('Cancel')} />
            <SmallText
              style={{ color: 'red' }}
            >{` ${error.message}`}</SmallText>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Stile
const styles = StyleSheet.create({
  container: { flex: 1 },
  modalContainer: {
    marginTop: 100,
    // borderWidth: 1,
    // borderColor: "black",
    borderRadius: 10,
    alignSelf: 'center',
    verticalAlign: 'auto',
    width: '30%',
    height: '50%',
    alignItems: 'center',
    //Schatten für iOS
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // Schatten für Android
    elevation: 10,
  },
  modalbox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    // Schatten für iOS
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // Schatten für Android
    elevation: 10,
  },
  modalContent: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
