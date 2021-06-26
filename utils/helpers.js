import  { AsyncStorage }  from "react-native"

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