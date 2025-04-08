import { View, StyleSheet } from 'react-native';
import { RecoilRoot } from 'recoil';
import {
  type themeType,
  Modal as ErfassungsMaske,
  SmallText,
  BigText,
  IconButton,
  Button,
  CrossPlatformPicker,
} from 'tkk-rn-component-package';
import { useState } from 'react';

type metaDataType = {
  [fieldName: string]: string | number;
};

const yearData = [{ value: '2025' }, { value: '2024' }, { value: '2023' }];
const persondata = [{ value: 'Barbara' }, { value: 'Thomas' }];
const catData = [
  { Spenden: ['mildtätige Zwecke', 'Parteien'] },
  { Kapitalerträge: ['Aktien', 'Festgeld'] },
  { Werbungskosten: ['Fahrten', 'Fortbildung'] },
  { Sonderausgaben: ['Altersvorsorge', 'Krankenversicherung'] },
  { Außergewöhnliche: ['Krankheitskosten', 'Beerdigungskosten'] },
  {
    Steuerermäßigungen: [
      'Handwerkerleistungen',
      'Haushaltsnahe Dienstleistungen',
    ],
  },
  { Steuervergünstigungen: ['Spenden', 'Vorsorgeaufwendungen'] },
  {
    'Vermietung und Verpachtung': [
      'schuldzinsen',
      'voll abzuziehende Erhaltungsaufwendungen',
      'Umgelegte Kosten, zb. Grundsteuer',
      'nicht umgelegte Kosten z.B. Verwaltung',
    ],
  },
];

export default function App() {
  const theme: themeType = 'light' as themeType;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fieldData, setFieldData] = useState<metaDataType>({});
  const [category, setcategory] = useState<string[]>([]);

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
    if (field === 'Kategorie') {
      //   val = Spenden
      catData.map((item) => {
        const key = Object.keys(item)[0] as keyof typeof item;
        if (key === val) {
          setcategory(item[key] ?? []);
        }
      });

      // key &&  setcategory(item[key as keyof typeof item])
      // setcategory(item[key as keyof typeof item];)
    }
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
                <CrossPlatformPicker
                  style={{ width: 200 }}
                  label="Jahr"
                  name="Jahr"
                  placeholder="select year"
                  theme={theme}
                  enabled={true}
                  validation={{ required: true }}
                  onValueChange={onValueChange}
                  items={yearData}
                />
                <CrossPlatformPicker
                  style={{ width: 200 }}
                  label="Name"
                  name="Name"
                  placeholder="Beleg für ..."
                  theme={theme}
                  enabled={true}
                  validation={{ required: true }}
                  onValueChange={onValueChange}
                  items={persondata}
                />
                <CrossPlatformPicker
                  style={{ width: 200 }}
                  label="Kategorie"
                  name="Kategorie"
                  placeholder="Kategorie ..."
                  theme={theme}
                  enabled={true}
                  validation={{ required: true }}
                  onValueChange={onValueChange}
                  items={catData.map((item) => {
                    const key = Object.keys(item)[0] as keyof typeof item;
                    return { value: key };
                  })}
                />
                {/* // Subcategories */}
                {category && (
                  <CrossPlatformPicker
                    style={{ width: 200 }}
                    label="subKategorie"
                    name="subKategorie"
                    placeholder="Sub Kategorie ..."
                    theme={theme}
                    enabled={true}
                    validation={{ required: true }}
                    onValueChange={onValueChange}
                    items={category.map((item) => ({ value: item }))}
                  />
                )}
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
