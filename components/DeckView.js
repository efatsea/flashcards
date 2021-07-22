import React, { Component } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { background, blue, green, grey, red, white } from "../utils/colors"
import { deleteDeck } from "../utils/helpers"
import AddCard from "./AddCard"

class DeckView extends Component {
    
    onDelete = ({  route, navigation }) => {
        const { title, decks } = this.props.route.params
        console.log(title)
        deleteDeck(title)
        this.props.navigation.navigate("Home")
    }

    render() {
        const { title, decks } = this.props.route.params
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text> 
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: green }]}
                    onPress={(event) => {
                        this.props.navigation.navigate("AddCard", {
                            title: title,
                            decks: decks
                        })
                    }}
                >
                    <Text style={styles.text}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={(event) => {
                        this.props.navigation.navigate("Quiz", {
                            title: title,
                            decks: decks
                        })
                    }}
                >
                    <Text style={styles.text}>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: red }]} onPress={this.onDelete.bind()}>
                    <Text style={styles.text}>Delete Deck</Text>
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
        fontSize:15,
        fontWeight: "bold"
    },
    title: {
        flex: 1,
        fontSize: 20,
        alignItems: "center",
        justifyContent: "center",
    }


})

export default DeckView