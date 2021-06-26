import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { background, grey, red } from "../utils/colors"
import { fetchDecks, setData, initData } from "../utils/helpers"

class Decks extends Component {
    state = {
        decks: null,
        decksName: null
    }
    componentDidMount () {
        if (this.state.object === null) {
            setData(initData)
                .then((res) => {
                    fetchDecks()
                        .then((obj) => {
                            this.setState({ decks: obj })
                            this.setState({ decksName: Object.keys(obj) })
                        })
                })
        }
        else {
            fetchDecks()
                .then((obj) => {
                    this.setState({ decks: obj })
                    this.setState({ decksName: Object.keys(obj) })
                })
        }
        
        
    }

    render(){
        
        const { decksName, decks } = this.state
        console.log(decks)
        return(
            <View style={styles.container}>
                <Text>Decks</Text>
                {decks !== null 
                    ? decksName.map((item) => {
                        return (
                            <TouchableOpacity key={item.length} style={styles.decksButton}>
                                <Text key={item}>{item}</Text>
                                <Text key={item.length}>{decks[item].questions.length} cards</Text>
                            </TouchableOpacity>
                            
                        )
                    })
                    :  <Text>Wait...</Text>
                }
                
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
        paddingBottom:40,
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

export default Decks