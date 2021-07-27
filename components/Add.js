import React, { Component } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { background, black, green, grey, red, white } from "../utils/colors"
import { fetchDecks, submitDeck } from "../utils/helpers"

class Add extends Component {
    state = {
        title: "",
        decks: null
    }

    setText = (text) => {
        this.setState({title: text})
    }

    onClick = ({navigation}) => {
        const { title, decks } = this.state
        console.log(title)
        submitDeck(title)
            .then(()=>{
                fetchDecks()
                    .then((obj) => {
                        this.setState({ decks: obj })
                    })
            })
            .then(()=>{
                this.props.navigation.navigate("DeckView", {
                    title: title,
                    decks: decks
                })
            })
        this.setState({ title: " " })
    }


    render() {
        const { title } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Add New Deck</Text>
                <Text>What is the title of the new Deck?</Text>
                <TextInput
                    placeholder = "Title"
                    onChangeText = {text => this.setText(text)}
                    defaultValue={title}
                    style = {styles.input}
                />
                <TouchableOpacity style={[styles.button, { backgroundColor: green }]} onPress={this.onClick.bind()}>
                    <Text>Add Deck</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: background,
        alignItems: "center",
        paddingBottom: 300,

    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 50,
        paddingRight: 50,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        backgroundColor: grey,
        height: 45,


    },
    text: {
        fontSize: 15,
        fontWeight: "bold"
    },
    title: {
        flex: 1,
        fontSize: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        marginVertical: 20,
        width: 200,
        height:70,
        borderColor: grey,
        borderWidth: 1,
        color:black,
        textAlign: "center",
        overflow: "scroll"
    }


})


export default Add