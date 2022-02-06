
const Card = (props) => {

    return (
        <div className={`flex flex-row border-black border-4 rounded-lg mb-10 card`}>{props.character}</div>
    )
}

export default Card;