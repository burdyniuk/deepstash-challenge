import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, StatusBar, TextInput} from 'react-native';
import Checkbox from 'expo-checkbox'; // used this because checkbox from react native is deprecated
import { useEffect, useState } from 'react';
import { PEOPLE } from './src/people';

export default function App() {
  const [isSelected, setSelection] = useState(false);
  const [search, setSearch] = useState("");
  const [lightReact, setLightReact] = useState([]);
  const [coldReact, setColdReact] = useState([]);

  // function wich filter bu reaction 🥶
  const getCold = () => {
    setColdReact(PEOPLE.filter(item => item.reaction === "🥶"))
  }

  // function wich filter bu reaction 💡
  const getLight = () => {
    setLightReact(PEOPLE.filter(item => item.reaction === "💡"))
  }

  useEffect (() => {
    getCold()
    getLight()
  }, [])

  // search filter function - filter people by first and last name
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = PEOPLE.filter(
        function (item) {
          const firstName = item.firstName
            ? item.firstName.toUpperCase()
            : ''.toUpperCase();
          const secondName = item.lastName
          ? item.lastName.toUpperCase()
          : ''.toUpperCase();
          const itemData = firstName.concat(" ", secondName)
          const textData = text.toUpperCase()
          return itemData.indexOf(textData) > -1
      });
      // update the arrays
      setColdReact(newData.filter(item => item.reaction === "🥶"))
      setLightReact(newData.filter(item => item.reaction === "💡"))
      setSearch(text)
    } else {
      // reset the arrays
      getCold()
      getLight()
      setSearch(text);
    }
  };

  const filterPeopleBio = (isTrue) => {
    getCold()
    getLight()
    searchFilterFunction(search)
    // filter people if they have bio
    if (isTrue) {
      const newCold = coldReact.filter(item => item.bio !== undefined)
      setColdReact(newCold)
      const newLight = lightReact.filter(item => item.bio !== undefined)
      setLightReact(newLight)
      setSelection(isTrue)
    } else {
      setSelection(isTrue)
    }
  };

  // render item of flatlist - profile picture, name and bio
  const renderItem = ({ item }) => (
    <View style={styles.personItem}>
      <Image source={{uri: item.image}} style={styles.profileImg} />
      <Text style={{paddingLeft: 20,}}>
        <Text style={{fontSize: 20,}}>{item.firstName} {item.lastName}</Text>
        {"\n"}
        {item.bio !== undefined && <Text style={{fontSize: 12,}}>{item.bio}</Text>}
      </Text>
    </View>
  );


  // rendering the screen with all UI elements
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" hidden={false} />
      <TextInput
        style={styles.input}
        onChangeText={(text) => searchFilterFunction(text)}
        placeholder="Search..."
        value={search}
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          disabled={false}
          value={isSelected}
          onValueChange={val => filterPeopleBio(val)}
          style={styles.checkbox}
        />
        <Text style={{margin: 8}}>Only show people with bio</Text>
      </View>
      <Text>Reacted with 💡:</Text>
      <FlatList
        data={lightReact}
        renderItem={renderItem}
      />
      <Text>Reacted with 🥶:</Text>
      <FlatList
        data={coldReact}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  checkbox: {
    alignSelf: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  personItem: {
    flexDirection: "row", 
    paddingVertical: 10, 
    alignItems:'center',
  },
});
