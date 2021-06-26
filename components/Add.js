import React, { Component } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { background, grey, red } from "../utils/colors"
import { setData } from "../utils/helpers"

class Add extends Component {
    state = {
        title: ""
    }

    setText = (text) => {
        this.setState({title: text})
    }

    onClick = () => {
        console.log("start")
        const { title } = this.state
        console.log(title)
        console.log("1")
        setData(title)
        this.setState({ title: "" })
        console.log("3")
           
        

    }

    render() {
        const { text } = this.state
        return (
            <View style={styles.container}>
                <Text>Add New Deck</Text>
                <Text>What is the title of the new Deck?</Text>
                <TextInput
                    placeholder = "Title"
                    onChangeText = {text => this.setText(text)}
                    defaultValue={text}
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
        backgroundColor: red,
    }

})

export default Add