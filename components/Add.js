import React, { Component } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { background, grey, red } from "../utils/colors"
import { submitDeck } from "../utils/helpers"

class Add extends Component {
    state = {
        title: ""
    }

    setText = (text) => {
        this.setState({title: text})
    }

    onClick = ({navigation}) => {
        const { title } = this.state
        console.log(title)
        submitDeck(title)
        this.setState({ title: " " })
        this.props.navigation.navigate("Decks") 
    }


    render() {
        const { title } = this.state
        return (
            <View style={styles.container}>
                <Text>Add New Deck</Text>
                <Text>What is the title of the new Deck?</Text>
                <TextInput
                    placeholder = "Title"
                    onChangeText = {text => this.setText(text)}
                    defaultValue={title}
                    style = {styles.text}
                />
                <TouchableOpacity onPress={this.onClick.bind()}>
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

export default Add