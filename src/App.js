import "tailwindcss/tailwind.css";
import './App.css';

import {useState} from "react";
import Intro from "./components/Intro";
import Board from "./components/Board";

const App = () => {

    const [showIntro, setShowIntro] = useState(true);
    const [showBoard, setShowBoard] = useState(false);

    const playBtnHandleClick = (e) => {
        setShowBoard(true)
        setShowIntro(false)
    }

    const backBtnHandleClick = (e) => {
        setShowBoard(false)
        setShowIntro(true)
    }

    return (
        <div className="container mx-auto h-screen">
            {
                showIntro &&
                <Intro playBtnHandleClick={playBtnHandleClick}/>
            }

            { showBoard &&
                <Board backBtnHandleClick={backBtnHandleClick}/>
            }
        </div>
    );
}

export default App;
