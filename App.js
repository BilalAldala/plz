import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';


import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from './SearchBar'
import Maps from './Map'
import AdressList from './List'
import MapModel from './MapModel'
import Settings from './Settings'



export class Map extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Maps />
      </View>
    );
  }
}
export class Setting extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Settings />
      </View>
    );
  }
}
export class List extends Component {
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SearchBar />
      </View>
    );
  }
}

export default createMaterialBottomTabNavigator({
  Map: {
    screen: Map, navigationOptions: {
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="google-maps" size={24} />
      )
    }
  },
  List: {
    screen: List, navigationOptions: {
      tabBarLabel: 'List',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="format-list-bulleted" size={24} />
      )
    }
  },
  Settings: {
    screen: Setting, navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="settings" size={24} />
      )
    }
  }
}, {
  activeTintColor: 'white',
  shifting: true
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
