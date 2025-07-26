import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { RecoilRoot } from 'recoil';
import {
  type themeType,
  SmallText,
  BigText,
  Input,
  InputSelect,
  Switch,
  Modal,
} from 'tkk-rn-component-package';
import { useState } from 'react';
import SwitchExample from './SwitchExample';
import InputSelectExample from './InputSelectExample';
import StandaloneInputSelectExample from './StandaloneInputSelectExample';

type metaDataType = {
  [fieldName: string]: string | number | boolean | undefined;
};

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const theme: themeType = 'light' as themeType;

  const [fieldData, setFieldData] = useState<metaDataType>({});
  const [value, setValue] = useState<string | number>(''); // Initialize with an empty string or number);
  const [value1, setValue1] = useState<string | number>('gfgggfgfgfg'); // Initialize with an empty string or number);
  //  store field/value pair
  const handleChange = (field: string, val: string | number) => {
    setValue(val);
    // setValue1(val);
    console.log(`Field: ${field}, Value: ${val}`);
    setFieldData({ ...fieldData, [field]: val });
  };
  const handleChange1 = (field: string, val: string | number) => {
    setValue1(val);
    // setValue1(val);
    console.log(`Field: ${field}, Value: ${val}`);
    setFieldData({ ...fieldData, [field]: val });
  };
  const handleChange2 = (field: string, val: string | number) => {
    setValue1(val);
    // setValue1(val);
    console.log(`Field: ${field}, Value: ${val}`);
    setFieldData({ ...fieldData, [field]: val });
  };

  const handleClose = (): void => {
    setIsModalVisible(false);
  };
  const uploadFile = () => {
    setIsModalVisible(true);
  };

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
            val={value}
            isDecimal={true}
            labelStyle={{ color: 'red' }}
            onValueChange={handleChange}
            theme={theme}
            keyboardType="decimal-pad"
          />
          <Input
            label="Text"
            name="text"
            val={value1}
            isDecimal={false}
            labelStyle={{ color: 'blue' }}
            onValueChange={handleChange1}
            theme={theme}
            keyboardType="url"
          />
          <InputSelect
            name="select"
            label="Select"
            onValueChange={handleChange2}
            theme={theme}
            items={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
              { label: 'Option 3', value: 'option3' },
            ]}
          />
        </Modal>

        <TouchableOpacity
          style={styles.docButtons}
          onPress={() => uploadFile()}
        >
          <Text style={styles.docButtonText}>Erfasse Doc</Text>
        </TouchableOpacity>
      </View>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  docButtonText: {
    color: 'white',
  },
});
