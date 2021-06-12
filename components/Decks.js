import React, { Component } from "react"
import { View, Text, Stylesheet } from "react-native"
import { fetchDecks, setData, initData } from "../utils/helpers"

class Decks extends Component {

    render(){
        return(
            <View>
                <Text>Decks</Text>
                {setData(initData)}
                {fetchDecks()}

            </View>
        )
    }
}

export default Decks