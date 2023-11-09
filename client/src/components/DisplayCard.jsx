

const DisplayCard = (Props)=> {
    const card = Props.card

    const API_URL = "http://localhost:3001"
    const IMG_URL = `${API_URL}/images/${card.image}`
    console.log(IMG_URL)

    return(
        <div className={"card " + card.color.toLowerCase() }>
            <img src={IMG_URL} className="card-image"></img>
            <div className="card-text">
                {card.name}<br/>
                {`HP: ${card.hp} `}<br/>
                {`ATK: ${card.atk}`}


            </div>
        </div>
    )




}
export default DisplayCard