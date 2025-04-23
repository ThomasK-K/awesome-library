import { View, StyleSheet } from 'react-native';
import { RecoilRoot } from 'recoil';
import {
  type themeType,
  SmallText,
  BigText,
  Input,Switch
} from 'tkk-rn-component-package';
import { useState } from 'react';


type metaDataType = {
  [fieldName: string]: string | number| boolean | undefined;
};



export default function App() {
  const theme: themeType = 'light' as themeType;

  const [fieldData, setFieldData] = useState<metaDataType>({});

 
  //  store filed/value pair
  const handleChange = (field: string, val: string|boolean) => {
    setFieldData({ ...fieldData, [field]: val });
    console.log('##### field #########', fieldData);
    
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
          <Input
            label="Betrag"
            name="betrag"
            onValueChange={handleChange}
            isDecimal={true}
            isPassword={false}
            validation={{ type: 'decimal', required: true }}
            theme={theme}
            props={{ style: { width: 200,height:50,padding:5} }}
          />
<BigText theme={theme}>
            switch: {fieldData.switch||fieldData.switch=== false ? fieldData.switch.toString() : ''}
          </BigText>
          <Switch 
            label="Switch"
            name="switch"
            onValueChange={handleChange}
          />
          
          
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
