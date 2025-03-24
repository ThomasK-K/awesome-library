import { StyleSheet, View, Modal,type ModalProps } from "react-native";
import React, { useState } from "react";
import {Button} from "./Buttons/Button";

import { newColors as Colors } from "../constants/colors";

///////////////////////////////////////////////////

type ModalProp = {
  buttonLabel: string;
  theme?: "light" | "dark";
  callback: () => void;
} & ModalProps;

export const ModalComponent: React.FC<{ children?: JSX.Element } & ModalProp> = ({
  buttonLabel,
  callback,
  theme,
  children,
}: { children?: JSX.Element } & ModalProp): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Funktion zum Öffnen des Modals
  const openModal = () => {
    setIsModalVisible(true);
  };

  // Funktion zum Schließen des Modals
  const closeModal = () => {
    setIsModalVisible(false);
    callback();
  };

  return (
    <View>
      {/* Button zum Öffnen des Modals */}
      <Button label="Open Modal" onClick={openModal} />
      {/* Modal */}
      <Modal
        style={[styles.modalContent]}
        visible={isModalVisible}
        animationType="slide" // Animationstyp: slide, fade, none
        transparent={true} // Modal ist transparent
        onRequestClose={closeModal}
        // Schließt das Modal, wenn der Benutzer zurückgeht (Android)
      >
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: Colors[theme ? theme : "dark"].background95 },
            { boxShadow: Colors[theme ? theme : "dark"].borderShadow },
            { width: 500 },
          ]}
        >
          {/* <View
            style={[
              styles.modalContent,
              { backgroundColor: Colors[theme ? theme : "dark"].background40 },
            ]}
          > */}
          <View style={styles.modalbox}>{children}</View>
          {/* Button zum Schließen des Modals */}
          <Button label={buttonLabel} onClick={closeModal} />
          {/* </View> */}
        </View>
      </Modal>
    </View>
  );
};

// Stile
const styles = StyleSheet.create({
  container: {},
  modalContainer: {
    marginTop: 100,
    // borderWidth: 1,
    // borderColor: "black",
    borderRadius: 10,
    alignSelf: "center",
    verticalAlign: "auto",
    width: "30%",
    height: "50%",
    alignItems: "center",
    //Schatten für iOS
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // Schatten für Android
    elevation: 10,
  },
  modalbox: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    // Schatten für iOS
    shadowColor: "#000",
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
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
