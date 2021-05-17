import arrayShuffle from 'array-shuffle'
import React from 'react'
import words from '../../utils/wordBank'
import BoardGraphic from '../BoardGraphic/BoardGraphic'

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
    const [validWords, setValidWords] = React.useState([])
    const [validWordsFound, setValidWordsFound] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [feedBack, setFeedBack] = React.useState()

    React.useEffect(() => {
        console.log('OUR USE EFFECT RUNNING')
        // Check if our word is constructed only of our letters.
        const wordHasOurLettersOnly = (word) => {
            // TODO: JS Exercise: See if you can convert this to a reduce or something.
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
        if (event)
            event.preventDefault()
        
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

    // Scramble the letters.
    const scrambleLetters = () => {
        const requiredLetter = letters[0]
        const theRestScrambled = arrayShuffle(letters.splice(1))
        setLetters([requiredLetter, ...theRestScrambled])
    }

    return(
        <>
            <h1>Amos's Alphabet</h1>
            <BoardGraphic letters={letters} height={250} width={250}/>
            <br/>
            {`Score: ${score} Words: ${validWordsFound.length} of ${validWords.length}`} 
            <br/><br/>
            <input
                type="text"
                value={guess}
                onChange={(e) => {setGuess(e.target.value)}} 
                onKeyPress={
                    (e) => {
                        if (e.key === 'Enter') {
                            handleGuess()
                        }
                    }
                }
            />
            <button onClick={() => handleGuess()}> Submit </button>
            <button onClick={() => scrambleLetters()}> Scramble </button>
            <h2>{feedBack}</h2>
            <ul>
                {validWordsFound.map(vw => <li>{vw}</li>)}
            </ul>
        </>
    )
}

export default Entrance