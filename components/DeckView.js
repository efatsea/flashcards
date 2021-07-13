import React, { Component } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { background, grey, red } from "../utils/colors"
import { deleteDeck } from "../utils/helpers"
import AddCard from "./AddCard"

class DeckView extends Component {
    
    onDelete = ({  route, navigation }) => {
        const { title, decks } = this.props.route.params
        console.log(title)
        deleteDeck(title)
        this.props.navigation.navigate("Home", {
            onGoBack: () => this.refresh()
        })
    }

    onQuiz = () => {

    }

    onAddCard = () => {

    }


    render() {
        const { title, decks } = this.props.route.params
        return (
            <View style={styles.container}>
                <Text>Add New Deck</Text>
                {decks[title].questions.map((ques)=>{
                    return (
                        <View key={ques.question}>
                            <Text key={ques.question}>{ques.question}</Text>
                            <Text key={ques.answer}>{ques.answer}</Text>
                        </View>
                    )
                })}
                
                <TouchableOpacity 
                    style={styles.decksButton}
                    onPress={(event) => {
                        this.props.navigation.navigate("AddCard", {
                            title: title,
                        })
                    }}
                >
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.decksButton}
                    onPress={(event) => {
                        this.props.navigation.navigate("Quiz", {
                            title: title,
                            decks: decks
                        })
                    }}
                >
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.decksButton} onPress={this.onDelete.bind()}>
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
        padding : 10,
    }

})

export default DeckView