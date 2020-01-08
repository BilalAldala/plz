
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Contacts } from 'expo'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const adresses = [
    {
        street: "English",
        city: "Sydney",
        country: "Australia"
    }, {
        street: "Estonian",
        city: "Sydney",
        country: "Australia"
    }, {
        street: "Esperanto",
        city: "Sydney",
        country: "Australia"
    }
];
export default class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            contacts: []
        };
    }
    loadContacts = async () => {
        this.setState({
            contacts: adresses, inMemoryLocaions: adresses, isLoading: false
        })
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        this.loadContacts()
    }
    renderItem = ({ item }) => (
        <View style={{ minHeight: 70, padding: 5 }}>
            <Text>
                {item.street}
            </Text>
        </View>
    );
    searchLocation = (value) => {
        const filteredLocations = this.state.inMemoryLocaions.filter(
            contact => {
                let contactLowercase = (contact.street + ' ').toLocaleLowerCase()

                let searchTermLowercase = value.toLocaleLowerCase()

                return contactLowercase.indexOf(searchTermLowercase) > -1
            }
        )
        this.setState({ contacts: filteredLocations });
    }
    render() {
        return (

            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: '#2f363c' }} />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#dddddd"
                    style={{ backgroundColor: '#2f363c', height: 60, fontSize: 20, padding: 10, color: 'white', borderBottomWidth: 0.5, borderBottomColor: '#7d90a0' }}
                    onChangeText={(value) => this.searchLocation(value)}
                />
                <View style={{ flex: 1 }}>
                    {this.state.isLoading ? (
                        <View
                            style={{
                                ...StyleSheet.absoluteFill,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <ActivityIndicator size="large" color="#bad555" />
                        </View>
                    ) : null}
                    <FlatList
                        data={this.state.contacts}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                                <Text style={{ color: '#bad555' }}>Result not found</Text></View>)}
                    />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
