import React, { Component } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { background, blue, green, grey, red } from "../utils/colors"
import { clearLocalNotification, setLocalNotification } from "../utils/helpers"

class Quiz extends Component {
    state = {
        show : false,
        correct : 0,
        wrong : 0,
        cardNum : 0

    }

    onShow = () => {
        this.setState({show: true})
    }

    onCorrect = () => {
        this.setState(preState => {
            return {
                correct: preState.correct+1,
                cardNum: preState.cardNum + 1,
                show: false
            }
        })
    }

    onWrong = () => {
        this.setState(preState => {
            return {
                wrong: preState.wrong+1,
                cardNum: preState.cardNum + 1,
                show: false
            }
        })
    }
    onRestart = () => {
        this.setState({ show: false, cardNum:0, correct:0, wrong:0 })
    }
    

    render() {
        const { title, decks } = this.props.route.params
        const { show, correct, wrong, cardNum } = this.state
        const totalCards = decks[title].questions.length
        const currDeck = decks[title].questions

        if(currDeck >= totalCards && totalCards!==0) {
            clearLocalNotification()
                .then(setLocalNotification)
        }

        return (
            <View style={styles.container}>
               { currDeck[cardNum] 
                    ? <View style={styles.container2}>
                        <Text style={styles.title}>{currDeck[cardNum].question}</Text>
                        <Text style={styles.text}>Answer:</Text>
                        {show === true
                            ? null
                            : <TouchableOpacity style={[styles.button, { backgroundColor: grey }]} onPress={this.onShow.bind()}>
                                <Text>Show Answer</Text>
                            </TouchableOpacity>

                        }
                        
                        {show === true ? <Text style={styles.text}>{currDeck[cardNum].answer}</Text> : null}
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={[styles.button, {
                                backgroundColor: green, paddingTop: 25,
                                paddingBottom: 25, }]} onPress={this.onCorrect.bind()}>
                                <Text>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, {
                                backgroundColor: red, paddingTop: 25,
                                paddingBottom: 25 }]} onPress={this.onWrong.bind()} >
                                <Text>Wrong</Text>
                            </TouchableOpacity>
                        </View>
                       
                        <Text style={[styles.text,{marginTop:10}]}>({cardNum+1}/{totalCards})</Text>
                    </View>
                : <View>
                        
                        {totalCards === 0
                            ? <Text style={styles.text}>Sorry no cards get!</Text>
                            :
                            <View style={styles.container2}>
                                <Text style={styles.title}>Finished!</Text>
                                <Text style={styles.title}>Correct Answers: {correct}/{totalCards}</Text>
                                <TouchableOpacity style={[styles.button, { backgroundColor: grey }]}
                                    onPress={this.onRestart.bind()}
                                >
                                    <Text>Restart Quiz</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, { backgroundColor: blue }]}
                                    onPress={(event) => {
                                        this.props.navigation.navigate("DeckView", {
                                            title: title,
                                            decks: decks
                                        })
                                    }}
                                >
                                    <Text>Back to Deck</Text>
                                </TouchableOpacity>
                            </View>
                            
                      }  

                </View>
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
        paddingBottom: 300,

    },
    container2: {
        flex: 1,
        alignItems: "center",

    },
    btnContainer:{
        flex: 1,
        flexDirection: "row",
        alignContent: "space-around"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 50,
        paddingRight: 50,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 30,
        backgroundColor: grey,
        height: 45,

    },
    text: {
        fontSize: 15,
        fontWeight: "bold"
    },
    title: {
        flex: 1,
        fontSize: 20,
        alignItems: "center",
        justifyContent: "center",
    }


})

export default Quiz