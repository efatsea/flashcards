import React, { Component } from "react"
import { View, Text, Stylesheet } from "react-native"
import { fetchDecks, setData, initData } from "../utils/helpers"

class Decks extends Component {
    state = {
        decker: null
    }
    componentDidMount () {
        if (this.state.object === null) {
            setData(initData)
                .then((res) => {
                    fetchDecks()
                        .then((obj) => {
                            this.setState(() => {
                                decker: obj
                            })
                            
                        })
                })
        }
        else {
            fetchDecks()
                .then((decker) => {
                    this.setState(() => {
                        decker
                    })
                    console.log(decker)
                })
        }
        
        
    }

    render(){
        
        const { decker } = this.state
        console.log("text")
        console.log( decker )
        return(
            <View>
                <Text>Decks</Text>
                {decker}
            </View>
        )
    }
}

export default Decks