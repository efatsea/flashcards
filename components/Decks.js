import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from "react-native"
import { background, grey, red } from "../utils/colors"
import { fetchDecks, setData, initData } from "../utils/helpers"





class Decks extends Component {
    
    state = {
        decks: null,
        decksName: null
    }
    
    refresh = () => {
        fetchDecks()
            .then((obj) => {
                this.setState({ decks: obj })
                this.setState({ decksName: Object.keys(obj) })
            })
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
        this._unsubscribe = this.props.navigation.addListener("didFocus", () => {
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
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>My Decks</Text>
                    {decksName !== null
                        ? decksName.map((item) => {
                            return (
                                <TouchableOpacity
                                    key={item.length + item}
                                    onPress={(event) => {

                                        this.props.navigation.navigate("DeckView", {
                                            title: item,
                                            decks: decks
                                        })
                                    }}
                                    style={styles.button}
                                >
                                    <Text key={item}>{item}</Text>
                                    <Text key={item.length + item}>{decks[item] ? decks[item].questions.length : null} cards</Text>
                                </TouchableOpacity>

                            )
                        })
                        : <Text>Wait...</Text>
                    }
                </View>
                
                
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
        paddingBottom: 300,
        
    },
    button: {
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
    },
    title: {
        flex: 1,
        fontSize: 20,
        alignItems: "center",
        justifyContent: "center",
    }


})



export default Decks