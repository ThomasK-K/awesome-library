import { MyText, BigText,SmallText } from 'tkk-rn-component-package';
import { View } from 'react-native';

export default function App() {
  return (
    <View>
 
      <SmallText theme="light">
        Dies ist der SmallText
      </SmallText>
      <BigText theme="dark">Dies ist ein Bigtext</BigText>
    </View>
  );
}
