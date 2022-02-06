import {audioCorrect, audioIncorrect, characters, soundLibrary} from "../Setup"
import {useEffect, useState} from "react"
import Card from "./Card"

const Board = (props) => {
    const shuffleCharacters = () => {
        let randomIdx = Math.floor(Math.random() * Object.keys(characters).length)
        return Object.keys(characters)[randomIdx]
    }

    const getSoundByCharacter = (character) => {
        let soundsByCharacter = []
        for (const item of soundLibrary) {
            if (item.search(character + "/snd_voices_item_") > 0) {
                soundsByCharacter.push(item)
            }
        }

        let randomIdx = Math.floor(Math.random() * soundsByCharacter.length)
        return soundsByCharacter[randomIdx]
    }

    const [character, setCharacter] = useState(() => {
        return shuffleCharacters()
    });

    const [points, setPoints] = useState(0)

    const handleKeyDown = (e) => {
        if (e.code === 'Enter') {
            console.log('Enter')
        } else if (e.code === 'Escape') {

        } else if (e.code === 'Space') {
            let c = shuffleCharacters()
            let snd = getSoundByCharacter(c)
            let letterAudio = new Audio(snd)
            letterAudio.play().then(r => {
                setCharacter(c)
            })
        } else if (Object.values(characters).includes(e.code)) {
            if (e.code === characters[character]) {
                audioCorrect.play().then(r => {
                    setPoints((prevPoints) => {
                        return prevPoints + 1
                    })
                    // increasePoint('good_answer');
                });
            } else {
                audioIncorrect.play().then(r => {
                    // increasePoint('bad_answer');
                });
            }
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    });

    return (
        <main className="flex flex-col h-full justify-center items-center board">
            <div className="points">
                Liczba punktów: {points}
            </div>
            <Card character={character}/>
            <div className="flex-row">
                <button
                    onClick={props.backBtnHandleClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back
                </button>
            </div>
        </main>
    )
}

export default Board;