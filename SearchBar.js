
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Contacts } from 'expo'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchAuto from "./SearchAuto";

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
    }, {
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
            contacts: [],
            searchText: "",
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
        <>
        {this.state.searchText.length > 1  &&
        <View style={{ minHeight: 40, padding: 5 }}>
            <Text>
                {item.street}
            </Text>
        </View>}
        </>
    );
    searchLocation = (value) => {
        const filteredLocations = this.state.inMemoryLocaions.filter(
            contact => {
                let contactLowercase = (contact.street + ' ').toLocaleLowerCase()

                let searchTermLowercase = value.toLocaleLowerCase()

                return contactLowercase.indexOf(searchTermLowercase) > -1
            }
        )
        this.setState({ contacts: filteredLocations, searchText: value });
    }
    render() {
        return (

            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: '#2f363c' }} />
                <SearchAuto/>
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
