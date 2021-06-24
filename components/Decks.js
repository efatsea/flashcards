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
                            this.setState({decker:Object.keys(obj)})
                        })
                })
        }
        else {
            fetchDecks()
                .then((decker) => {
                    this.setState({decker:Object.keys(decker)})
                })
        }
        
        
    }

    render(){
        
        const { decker } = this.state
        console.log(decker)
        return(
            <View>
                <Text>Decks</Text>
                {decker !== null 
                    ? decker.map((item) => {
                        return (
                            <Text key={item}>{item}</Text>
                        )
                      })
                    :  null
                }
                
            </View>
        )
    }
}

export default Decks