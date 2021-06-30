import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from "react-native"
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
        this._unsubscribe = this.props.navigation.addListener("tabPress", () => {
            fetchDecks()
                .then((obj) => {
                    
                        this.setState({ decks: obj })
                        this.setState({ decksName: Object.keys(obj) })
                    
                })
        })
        this._unsubscribe = this.props.navigation.addListener("focus", () => {
            fetchDecks()
                .then((obj) => {

                    this.setState({ decks: obj })
                    this.setState({ decksName: Object.keys(obj) })

                })
        })
    }

    componentWillUnmount(){
        this._unsubscribe()
    }

    render(){
        const { decksName, decks } = this.state
        console.log(decksName)
        return(
            <ScrollView >
                <Text>Decks</Text>
                {decksName !== null 
                    ? decksName.map((item) => {
                        return (
                            <TouchableOpacity key={item.length+item} style={styles.decksButton}>
                                <Text key={item}>{item}</Text>
                                <Text key={item.length+item}>{decks[item].questions.length} cards</Text>
                            </TouchableOpacity>
                            
                        )
                    })
                    :  <Text>Wait...</Text>
                }
                
            </ScrollView>
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