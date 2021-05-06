import React from 'react'
import words from '../../utils/wordBank'

const minLetterCount = 4
const maxLetterCount = 7

const getRandomLetters = () => {
    let letters = []

    while (letters.length < maxLetterCount) {
        console.log(`Length of letters ${letters.length}`)
        // Get a random letter from ascii codes between 97 and 122.
        const randLetter = String.fromCharCode(Math.floor(Math.random() * (122 - 97) + 97))
        console.log(`Generate: ${randLetter}`)

        // The generated letter does not exist.  Add it to our list.
        if (letters.indexOf(randLetter) === -1) {
            letters.push(randLetter)
            console.log(`Added ${randLetter} to letter list`)
            console.log(letters)
        } 
        
        // It exists... Keep going.
        else {
            console.log(`Duplicate ${randLetter}`)
        }
    }

    return letters
}


function Entrance() {
    const [letters, setLetters] = React.useState(getRandomLetters())

    console.log(`Letters!!!`)
    console.log(letters)
    return(
        <>
            <h1>Words Length</h1>
            {words.length}
            {letters.map(letter => <h3>{letter}</h3>)}
        </>
    )
}

export default Entrance