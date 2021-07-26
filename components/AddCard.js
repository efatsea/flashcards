import React, { Component } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { background, black, green, grey, red } from "../utils/colors"
import { fetchDecks, submitCard } from "../utils/helpers"

class AddCard extends Component {
    state = {
        question: "",
        answer: "",
        decks:null
    }

    setTextQuestion = (text) => {
        this.setState({ question: text })
    }

    setTextAnswer = (text) => {
        this.setState({ answer: text })
    }

    onClick = ({ navigation }) => {
        const { question, answer } = this.state
        const { title} =this.props.route.params
        const { decks } = this.state
        console.log(title)
        submitCard(title, question, answer)
            .then(()=>{
                fetchDecks()
                    .then((obj) => {
                        this.setState({ decks: obj })
                        this.setState({ question: " " })
                        this.setState({ answer: " " })
                    })
                    .then(()=>{
                        this.props.navigation.navigate("DeckView", {
                            title: title,
                            decks: decks,
                        })
                    })
            })
       
    }


    render() {
        const { question, answer } = this.state
        const { title } = this.props.route.params
        console.log(title)
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Add New Card</Text>
               
                <TextInput
                    placeholder="Question"
                    onChangeText={text => this.setTextQuestion(text)}
                    defaultValue={question}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Answer"
                    onChangeText={text => this.setTextAnswer(text)}
                    defaultValue={answer}
                    style={styles.input}
                />
                <TouchableOpacity style={[styles.button, { backgroundColor: green }]} onPress={this.onClick.bind()}>
                    <Text style>Add Card</Text>
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
    input:{
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 100,
        paddingRight: 100,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        color: black,
        borderColor: grey,
        borderWidth: 1,
    }


})


export default AddCard