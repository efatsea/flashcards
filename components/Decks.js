import React, { Component } from "react"
import { View, Text, Stylesheet } from "react-native"
import { fetchDecks, setData, initData } from "../utils/helpers"

class Decks extends Component {
    state = {
        object: null
    }
    componentDidMount () {
        if (this.state.object === null) {
            setData(initData)
                .then (() => {
                    const obj =fetchDecks()
                        .then((obj) => {
                            this.setState(() => {
                                object: obj
                            })
                        })
                })
        }
        else {
            const obj = fetchDecks()
                .then((obj) => {
                    this.setState(() => {
                        object: obj
                    })
                })
        }
        console.log(this.state.object)
    }
    render(){
        const { object } = this.state
        console.log( object )
        return(
            <View>
                <Text>Decks</Text>
                {object}
            </View>
        )
    }
}

export default Decks