import React, { Component } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { background, grey, red } from "../utils/colors"
import { deleteDeck } from "../utils/helpers"

class DeckView extends Component {
    
    onDelete = ({  route, navigation }) => {
        const { title, decks } = this.props.route.params
        console.log(title)
        deleteDeck(title)
        this.props.navigation.navigate("Decks")
    }

    onQuiz = () => {

    }

    onAddCard = () => {

    }


    render() {
        console.log 
        return (
            <View style={styles.container}>
                <Text>Add New Deck</Text>
                <Text>What is the title of the new Deck?</Text>
                
                <TouchableOpacity onPress={this.onDelete.bind()}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onDelete.bind()}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onDelete.bind()}>
                    <Text>Delete Deck</Text>
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
        marginTop: 30,
    },
    decksButton: {
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
        backgroundColor: red,
    }

})

export default DeckView