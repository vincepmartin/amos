import React from 'react'
import words from '../../utils/wordBank'

const minLetterCount = 4
const maxLetterCount = 7

const getRandomLetters = () => {
    let letters = []

    while (letters.length < maxLetterCount) {
        // Get a random letter from ascii codes between 97 and 122.
        const randLetter = String.fromCharCode(Math.floor(Math.random() * (122 - 97) + 97))

        // The generated letter does not exist.  Add it to our list.
        if (letters.indexOf(randLetter) === -1) {
            letters.push(randLetter)
        } 
    }

    return letters
}


function Entrance() {
    const [letters, setLetters] = React.useState(getRandomLetters())
    const [guess, setGuess] = React.useState('')
    const [validWords, setValidWords] = React.useState()
    const [validWordsFound, setValidWordsFound] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [feedBack, setFeedBack] = React.useState()

    React.useEffect(() => {
        console.log('OUR USE EFFECT RUNNING')
        // Check if our word is constructed only of our letters.
        const wordHasOurLettersOnly = (word) => {
            for (const c in word) {
                if (!letters.includes(word[c])) {
                    return false
                }
            }
            return true
        }

        const getValidWords = () => {
            // Includes our required letter.
            return words.filter(word => word.includes(letters[0]))
            // Is 4 chars long.
            .filter(word => word.length >= minLetterCount)
            // Only includes one of our letters.
            .filter(word => wordHasOurLettersOnly(word))
        }
        setValidWords(getValidWords())

    }, [])

    const handleGuess = (event) => {
        event.preventDefault()
        console.log('Handling Guess')

        if (validWords.includes(guess) && !validWordsFound.includes(guess)) {
            setValidWordsFound([...validWordsFound, guess])
            setScore(score + guess.length)
            setFeedBack('Valid word found!')
            setGuess('')
        }

        else {
            setFeedBack('Invalid word!')
        }
    }

    return(
        <>
            <h1>Amos's Alphabet</h1>
            <h2>Required Letter</h2>
            {letters[0]}
            <h2>Other letters</h2>
            {letters.slice(1)}
            <h2>Score: {score}</h2> 
            <h2>{feedBack}</h2>
            <form onSubmit={handleGuess}>
                <label>
                    Guess:
                    <input type="text" value={guess} onChange={(e) => {setGuess(e.target.value)}} />
                </label>
                <input type="submit" value="Guess" />
            </form>
        </>
    )
}

export default Entrance