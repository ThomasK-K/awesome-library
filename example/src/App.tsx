import {

  Flatlist
} from 'tkk-rn-component-package';
import { View, StyleSheet } from 'react-native';
import type { themeType } from 'tkk-rn-component-package';

const DATA = [
  {
    id: "eins",
    title: "My First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "My Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "my Third Item",
  },
];

export default function App() {
  const theme: themeType = 'light' as themeType;

  const handleClick= (action:string,id:string):void=>{
    console.log('##### hanleClick #########',action,id)
  }

  return (
    <View
      style={[styles.container, theme === 'light' ? styles.dark : styles.light]}
    >
      {/* <SmallText theme={theme}>Dies ist der SmallText</SmallText>
      <BigText theme={theme}>Dies ist ein Bigtext mit theme {theme}</BigText>
      <Button theme={theme} label="Click" onClick={() => {}} />
      <IconButton theme={theme} label="delete" onClick={() => {}} /> */}
      <Flatlist theme={theme} data={DATA} onClick={handleClick} width={100}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  light: {
    backgroundColor: 'rgb(203,203,203)',
  },
  dark: {
    backgroundColor: 'rgb(100,100,100)',
  },
});
