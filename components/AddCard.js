import React, { Component } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { background, grey, red } from "../utils/colors"
import { submitCard } from "../utils/helpers"

class AddCard extends Component {
    state = {
        question: "",
        answer: ""
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
        console.log(title)
        submitCard(title, question, answer)
        this.setState({ question: " " })
        this.setState({ answer: " " })
        this.props.navigation.navigate("Decks")
    }


    render() {
        const { question, answer } = this.state
        const { title } = this.props.route.params
        console.log(title)
        return (
            <View style={styles.container}>
                <Text>Add New Card</Text>
               
                <TextInput
                    placeholder="Question"
                    onChangeText={text => this.setTextQuestion(text)}
                    defaultValue={question}
                    style={styles.text}
                />
                <TextInput
                    placeholder="Answer"
                    onChangeText={text => this.setTextAnswer(text)}
                    defaultValue={answer}
                    style={styles.text}
                />
                <TouchableOpacity onPress={this.onClick.bind()}>
                    <Text>Add Card</Text>
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
        backgroundColor: grey,
        padding: 20,
        paddingLeft: 50,
        paddingRight: 50

    }

})

export default AddCard