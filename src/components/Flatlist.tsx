
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { newColors as Colors } from "../constants/colors";

import {SmallText} from "./Texts/SmallText";
import { IconButton } from "./Buttons/IconButton";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

type ItemProps = { title: string; style: any };

type FlatlistProps = {
  width: number;
  theme: "light" | "dark";
  data: {id:string,title:string}[]
  props?: any;
};
const Item = ({ title, style }: ItemProps) => (
  <View style={[style]}>
    <SmallText style={[style]}>{title}</SmallText>
  </View>
);
//##################################################
export const MyFlatlist = ({ width, theme,data, ...props }: FlatlistProps) => {
  const handleBlur = () => {
    console.log("handleBlur");
  };
  const handleClick = (iconName:string,id:string) => {
    console.log("handleClick", iconName,id);
  };
  const {}={...props}
  const strArray = data??DATA
  
  const itemStyle = [styles.item,{color:Colors[theme ? theme : "dark"].fontcolor}];
  return (
    <View style={[styles.container]}>
      <Pressable
        style={[
          styles.inputField,
          { backgroundColor: Colors[theme ? theme : "dark"].bg_input },
          { borderBottomColor: Colors[theme ? theme : "dark"].border_color },
          { shadowColor: Colors[theme ? theme : "dark"].shadow_color },
        ]}
        onBlur={handleBlur}
      >
        <FlatList
          style={[{ width: width }]}
          data={strArray}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Item style={[itemStyle,{color:"black"}]} title={item.title} />
              <View style={styles.iconStyle}>
                <IconButton theme={theme} label="new" onClick={() => handleClick('new', item.id)} />
                <IconButton theme={theme} label="edit" onClick={() => handleClick('edit', item.id)} />
                <IconButton theme={theme} label="delete" onClick={() => handleClick('delete', item.id)} />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: StatusBar.currentHeight || 0,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderTopRightRadius: 10,
    margin: 0,
  },
  iconStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  item: {
    padding: 2,
    marginVertical: 4,
    marginHorizontal: 6,
  },
  inputField: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomWidth: 2,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,

    shadowColor: "#fff",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // Schatten für Android
    elevation: 10,

    margin: 5,
  },
});

// export default MyFlatlist;
