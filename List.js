import React from 'react';
import { TouchableOpacity, SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

import { NavigationEvents } from "react-navigation";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function Item({ title }) {
  return (
    <View style={styles.containertwo}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "stretch"
                }}
              >
                <View style={{flexDirection: "row" }}>
                  <Icon name="map-marker" size={24} color="blue" />
                    <Text style={{ fontWeight: "bold" }}>
                      {title}
                      {"\n"}
                      {title}
                    </Text>
                </View>
                <View style={{ height: 25 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    <Icon name="timer" size={24} color="blue" />
                    {title}
                  </Text>
                </View>
                <View style={{ height: 25 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    <Icon name="map-marker-distance" size={24} color="blue" />
                    {" gk"}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{ paddingTop: 10, paddingRight:10 }}
                onPress={() => this.state.MapModelObj.getDirection(location)}
              >
                <View>
                  <Icon name="directions" size={70} color="blue" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
    
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  containertwo: {
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "blue",
    borderBottomWidth: 3
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

