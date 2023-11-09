
import {useState} from 'react'
import DisplayCard from './DisplayCard.jsx'
const CardSearch = ()=>{
    const API_URL = "http://localhost:3001"
    const [cards, setCards] = useState([])

    const getCards = async (name) => {

        let uri = `${API_URL}/view-card/${name}`
        console.log(uri)
        fetch(uri)
        .then(res =>res.json())
        .then(jsonData => {
            console.log(jsonData)
            setCards(jsonData)})
        .catch("Server Error (maybe)")
    }

    return(
        <div>
            <label className="label" htmlFor="search-bar">Enter Card Name</label>
            <input type="text" placeholder="ex: Captain Toad" id="search-bar"></input><br/>
            <button className="default-button" onClick={()=>{
                const name = document.getElementById("search-bar").value
                console.log(name)
                getCards(name).then(console.log(cards))
            }}></button>

            <div className="card-array">
                {cards.map((card) => (
                    <DisplayCard card={card} key={card._id}></DisplayCard>
                ))}
            </div>
        </div>
    )
}
export default CardSearch