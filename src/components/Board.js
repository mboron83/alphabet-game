import Card from "./Card";

const Board = (props) => {

    return (
        <main className={`flex flex-col h-full justify-center items-center board`}>
            <Card />

            <div className="flex-row">
                <button onClick={props.backBtnHandleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Back
                </button>
            </div>
        </main>
    )
}

export default Board;