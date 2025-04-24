import { View, StyleSheet,TouchableOpacity,Text } from 'react-native';
import { RecoilRoot } from 'recoil';
import {
  type themeType,
  SmallText,
  BigText,
  Input,
  Switch,
  Modal,
} from 'tkk-rn-component-package';
import { useState } from 'react';

type metaDataType = {
  [fieldName: string]: string | number | boolean | undefined;
};

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const theme: themeType = 'light' as themeType;

  const [fieldData, setFieldData] = useState<metaDataType>({});

  //  store filed/value pair
  const handleChange = (field: string, val: string | boolean) => {
    setFieldData({ ...fieldData, [field]: val });
  };

  const handleClose = (): void => {
    setIsModalVisible(false);
    
  }
  const uploadFile= () => {setIsModalVisible(true);};
  return (
    <RecoilRoot>
      <View
        style={[
          styles.container,
          theme === 'dark' ? styles.dark : styles.light,
        ]}
      >
    
          <Modal
            buttonLabel="Speichern"
            visible={isModalVisible}
            onClose={handleClose}
            theme={'dark'}
          >
            <SmallText theme={theme}>Dies ist der SmallText</SmallText>
            <BigText theme={theme}>
              Dies ist ein Bigtext mit theme {theme}
            </BigText>
            <Input
              label="Betrag"
              name="betrag"
              onValueChange={handleChange}
              isDecimal={true}
              isPassword={false}
              validation={{ type: 'decimal', required: true }}
              theme={theme}
              style={{ width: 400, height: 50, padding: 5 }}
            />
            <BigText style={{ width: 300 }} theme={theme}>
              switch:{' '}
              {fieldData.switch || fieldData.switch === false
                ? fieldData.switch.toString()
                : ''}
            </BigText>
            <Switch label="Switch" style={{width:400}} name="switch" onValueChange={handleChange} />
          </Modal>
          <TouchableOpacity
                style={styles.docButtons}
                onPress={() => uploadFile()}
             
              >
                <Text style={styles.docButtonText}>Erfasse Doc </Text>
              </TouchableOpacity>
        </View>
    
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: .7,
    justifyContent: 'center',
    // alignItems: 'center',
  },

  content: {
    margin: 100,
    // borderWidth: 1,
    // borderColor: "black",
    borderRadius: 10,
    alignSelf: 'center',
    verticalAlign: 'auto',
    width: '30%',
    height: '50%',
    alignItems: 'center',
  },
  buttonView: {
    width: 100,
    // alignItems: 'center',
  },
  light: {
    backgroundColor: 'rgb(203,203,203)',
  },
  dark: {
    backgroundColor: 'rgb(100,100,100)',
  },
  docButtons: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  docButtonText: {
    color: "white",
  }
});
