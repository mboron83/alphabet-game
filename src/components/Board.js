import {audioCorrect, audioIncorrect, characters, soundLibrary} from "../Setup"
import {useEffect, useState} from "react"
import Card from "./Card"
import nextIcon from '../random.svg';
import exitIcon from '../close-round-line.svg';
import replayIcon from '../replay-video.svg';


const Board = (props) => {
    const shuffleCharacters = () => {
        let randomIdx = Math.floor(Math.random() * Object.keys(characters).length)
        return Object.keys(characters)[randomIdx]
    }

    const randomSound = (sndTab) => {
        let randomIdx = Math.floor(Math.random() * sndTab.length)
        return sndTab[randomIdx]
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
    const [lock, setLock] = useState(false)

    const handleKeyDown = (e) => {
        if (e.code === 'Enter') {
            let characterSound = new Audio(getSoundByCharacter(character))
            characterSound.play().then(r => {
            })
        } else if (e.code === 'Escape') {
            props.backBtnHandleClick()
        } else if (e.code === 'Space') {
            let c = shuffleCharacters()
            let characterSound = new Audio(getSoundByCharacter(c))
            characterSound.play().then(r => {
                setCharacter(c)
                setLock(false)
            })
        } else if (Object.values(characters).includes(e.code)) {
            if (e.code === characters[character]) {
                let audio = randomSound(audioCorrect)
                audio.play().then(r => {
                    if (!lock) {
                        setPoints((prevPoints) => {
                            return prevPoints + 1
                        })
                    }
                    setLock(true)
                })
            } else {
                let audio = randomSound(audioIncorrect)
                audio.play().then(r => {
                })
            }
        }
    }

    useEffect(() => {
        window.addEventListener('keypress', handleKeyDown)

        return () => {
            window.removeEventListener('keypress', handleKeyDown)
        }
    });

    return (
        <main className="flex flex-col h-full justify-center items-center board">
            <div className="points">
                Points: {points}
            </div>
            <Card character={character}/>
            <div className="flex-row">
                <button
                    onClick={props.backBtnHandleClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center w-32"
                >
                    <img src={exitIcon} className="w-6 h-6 mr-2" alt="" />
                    <span>Exit</span>
                </button>

                <button
                    onClick={() => {
                        let characterSound = new Audio(getSoundByCharacter(character))
                        characterSound.play().then(r => {})
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-cente ml-4 mr-4 w-32"
                >
                    <img src={replayIcon} className="w-6 h-6 mr-2" alt="" />
                    <span>Replay</span>
                </button>

                <button
                    onClick={() => {
                        let c = shuffleCharacters()
                        let characterSound = new Audio(getSoundByCharacter(c))
                        characterSound.play().then(r => {
                            setCharacter(c)
                            setLock(false)
                        })
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center w-32"
                >
                    <img src={nextIcon} className="w-6 h-6 mr-2" alt="" />
                    <span>Shuffle</span>
                </button>
            </div>
        </main>
    )
}

export default Board;