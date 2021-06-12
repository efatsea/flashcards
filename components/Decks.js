import React, { Component } from "react"
import { View, Text, Stylesheet } from "react-native"
import { fetchDecks, setData, initData } from "../utils/helpers"

class Decks extends Component {
    componentDidMount () {
        setData(initData)
        fetchDecks()
    }
    render(){
        return(
            <View>
                <Text>Decks</Text>
            </View>
        )
    }
}

export default Decks