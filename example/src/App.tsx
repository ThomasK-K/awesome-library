import { View, StyleSheet } from 'react-native';
import { RecoilRoot } from 'recoil';
import {
  type themeType,
  Modal as ErfassungsMaske,
  SmallText,
  BigText,
  IconButton,
  Button,
  InputSelect,
  Input,
} from 'tkk-rn-component-package';
import { useState } from 'react';

type metaDataType = {
  [fieldName: string]: string | number;
};

export default function App() {
  const theme: themeType = 'light' as themeType;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fieldData, setFieldData] = useState<metaDataType>({});

  const handleClick = (): void => {
    setIsModalVisible(true);
  };
  // ### when Erfassung is closed
  const handleClose = (action: string): void => {
    // when Modal is closed
    setIsModalVisible(false);
    action === 'Save'
      ? console.log('##### SaveData  #########', fieldData)
      : console.log('##### Cancel  #########');
  };
  //  store filed/value pair
  const onValueChange = (field: string, val: string) => {
    setFieldData({ ...fieldData, [field]: val });
  };

  return (
    <RecoilRoot>
      <View
        style={[
          styles.container,
          theme === 'dark' ? styles.dark : styles.light,
        ]}
      >
        <View style={styles.content}>
          <SmallText theme={theme}>Dies ist der SmallText</SmallText>
          <BigText theme={theme}>
            Dies ist ein Bigtext mit theme {theme}
          </BigText>
          <View style={styles.buttonView}>
            <Button theme={theme} label="Click" onClick={handleClick} />
            <IconButton
              theme={theme}
              label="delete"
              onClick={() => {
                handleClick;
              }}
            />
          </View>
          {/* <Flatlist theme={theme} data={DATA} onClick={handleClick} width={100}/> */}
          {isModalVisible && (
            <ErfassungsMaske
              buttonLabel="Speichern"
              visible={isModalVisible}
              onClose={handleClose}
              theme={theme}
            >
              {/* ######### Felder ################## */}
              <BigText theme={theme}>Rechnung erfassen</BigText>
              <View>
                <InputSelect
                  label="Jahr"
                  name="Jahr"
                  theme={theme}
                  validation={{ required: true }}
                  onValueChange={onValueChange}
                  valueList={['', '2025', '2024', '2023']}
                />
                <InputSelect
                  label="Art"
                  name="Art"
                  iconName="radio"
                  validation={{ required: true }}
                  theme={theme}
                  onValueChange={onValueChange}
                  valueList={['', 'Grundsteuer', 'Strom', 'Gas']}
                />
                <Input
                  label="Betrag"
                  theme={theme}
                  isDecimal={false}
                  validation={{ required: true }}
                  name="Betrag"
                  onValueChange={onValueChange}
                />
              </View>
            </ErfassungsMaske>
          )}
        </View>
      </View>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
