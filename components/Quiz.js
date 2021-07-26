import React, { Component } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { background, grey, red } from "../utils/colors"
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

        if(currDeck >= totalCards) {
            clearLocalNotification()
                .then(setLocalNotification)
        }

        return (
            <View style={styles.container}>
               { currDeck[cardNum] 
                ?   <View>
                        <Text>{currDeck[cardNum].question}</Text>
                        <Text>Answer:</Text>
                        {show === true
                            ? null
                            : <TouchableOpacity style={styles.decksButton} onPress={this.onShow.bind()}>
                                <Text>Show Answer</Text>
                            </TouchableOpacity>

                        }
                        
                        {show === true ? <Text>{currDeck[cardNum].answer}</Text> : null}
                        <TouchableOpacity style={styles.decksButton} onPress={this.onCorrect.bind()}>
                            <Text>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.decksButton} onPress={this.onWrong.bind()} >
                            <Text>Wrong</Text>
                        </TouchableOpacity>
                        <Text>({cardNum+1}/{totalCards})</Text>
                    </View>
                : <View>
                        <Text>Finish</Text>
                        <Text>Correct Answers: {correct}/{totalCards}</Text>
                        <TouchableOpacity style={styles.decksButton}
                            onPress={this.onRestart.bind()}
                        >
                            <Text>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.decksButton} 
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
        padding: 10,
    }

})

export default Quiz