import  { AsyncStorage }  from "react-native"
import { Notifications } from "expo"
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = "Flashcards:notifications"
const DECKS_STORAGE_KEY = "save-decks"
export let initData = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

export function setData (data) {
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data),(err)=>{
        if (err) {
            console.log("er")
            throw err
        }
    }).catch((err)=> {
        console.log("error was ", + err)
    })
}

export function submitCard(deck, ques, ans) {
    console.log("1")
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results)=> {
        console.log("1.5")
        const data = JSON.parse(results)
        const decki = data[deck]
        let questions = decki.questions
        console.log("2")
        console.log(questions)
        questions.push({question: ques, answer: ans})
        const updated  = {[deck]: decki}
        console.log("3")
        AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(
            updated
        ))
            .then(()=> console.log("Sucess"))
            .catch((err)=> console.log("Error is", + err))
    })
    .catch((err) => console.log("Error is ", + err))
}

export const deleteDeck = (key) => {
    
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function submitDeck (data) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [data] : {
            "questions":[],
            "title": data ,
        }
    }))
}



export const fetchDecks = async() => {
    try {
        const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
        if (data !== null) {
            const results = JSON.parse(data)
            return  results
            
        }
    } catch (error) {
        console.log("error is ", + error)
    }
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification() {
    return {
        title: "Let's start a new quiz! ",
        body:"Hi! Don't stop your practise... Start a new quiz now!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: "high",
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === "granted") {
                            Notifications.cancelAllScheduledNotificationsAsync()
                            let tommorow = new Date()
                            tommorow.setDate(tommorow.getDate()+1)
                            tommorow.setHours(20)
                            tommorow.setMinutes(0)
                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tommorow,
                                    replay: "day"
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true) )
                        }
                    })
            }
        })
}