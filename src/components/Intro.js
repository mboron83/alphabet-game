import logo from '../logo.svg';

const Intro = (props) => {

    return (
        <main className={`flex flex-col h-full justify-center items-center`}>
            <div className="max-w-xl mx-auto flex p-6 bg-white rounded-lg shadow-xl mb-10">
                <div className="flex-shrink-0">
                    <img className="h-12 w-12" src={logo} alt="Alphabet Game Logo" />
                </div>
                <div className="ml-6 pt-1">
                    <h4 className="text-xl text-gray-900 leading-tight">Alphabet Game</h4>
                    <p className="text-base text-gray-600 leading-normal">Press play button to start new game!</p>
                </div>
            </div>
            <div className="flex justify-center">
                <button onClick={props.playBtnHandleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Play
                </button>
            </div>
        </main>
    )
}

export default Intro;