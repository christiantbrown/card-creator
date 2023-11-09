import {useState} from 'react'
import CardSearch from './components/CardSearch.jsx'

function App() {

  // const submitCard = ()=>{
  //   const formData = new FormData(document.getElementById('make-card-form'))
  //   console.log(formData.get("image"))
  //   // cardImage=document.getElementById("image").file
  //   // console.log(cardImage)
  //   const newCard = {
  //     hp:formData.get("hp"),
  //     atk:formData.get("atk"),
  //     image:formData.get("image"),
  //     color:formData.get("color"),
  //     name:formData.get("name")
  //   }

  //   fetch(API_URL + "/save-new-card",{
  //     method:'POST',
  //     headers:{
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //     body:JSON.stringify(newCard)

  //   }).then((res)=>console.log(res))
  // }



  const API_URL = "http://localhost:3001"

  let colors=[
    "Blue",
    "White",
    "Purple"
  ]
  const[color, setColor] = useState("blue")
  const[hp, setHp] = useState(0)
  const[atk, setAtk] = useState(0)
  const[name, setName] = useState("")
  const[searchBarEnabled,setSearchBarEnabled] = useState(false)


  return (
    <div className='root'>
      <div className={color + " card-preview"} name="cardPreview">
      {/* this will be redone later */}
        name:{name}<br/>
        hp: {hp}<br/>
        atk: {atk}<br/>
        color: {color}<br/>
        <img className="card-preview-image" id="card-image"></img>
      </div>


      
      <form className="make-card-form" id="make-card-form" method="POST" action={API_URL + "/save-new-card"} encType ="multipart/form-data">

        <label className="label" htmlFor="card-name">Enter Name</label>
        <input type="text" id="card-name" name="name" className="text-input input" placeholder="ex: Radagon of the Golden Order" onChange={(event)=>{setName(event.target.value)}}></input>

        <label className="label" htmlFor='image'>Upload Card Art</label>
        <input type='file' id='image' className='file-input input' name='image' accept="image/*" onChange={(event)=>{
          document.getElementById("card-image").src=URL.createObjectURL(event.target.files[0])
        }}

        ></input>

        <label className="label" htmlFor="color">Select Color</label>
        <select id="color" className="dropdown input" name="color" onInput={(event)=>{setColor(event.target.value.toLowerCase())}}>
          {colors.map(newColor => <option value={newColor} key={newColor}>{newColor}</option>)}
        </select>

        <div className="enter-stats">
          <label className='stat-label' htmlFor="hp">HP</label>
          <input className='stat-form' type="text" id="hp" name="hp" onChange={(event)=>{setHp(event.target.value)}}></input>

          <label className='stat-label' htmlFor='atk'>ATK</label>
          <input className='stat-form' type="text" id="atk" name="atk" onChange={(event)=>{setAtk(event.target.value)}}></input>
        </div>

        <input type="reset" className="input" onClick={()=>{
          setHp(0)
          setAtk(0)
          setColor("purple")
          setName("")
          document.getElementById("card-image").src=""
        }}></input>
        <input type="submit" value="Submit" onClick={(event)=>{event.preventDefault}}></input>

      </form>
      <br/>
      <button id="toggle-search-window" className = "default-button" onClick={()=>{setSearchBarEnabled(searchBarEnabled ? false : true)/*toggles search bar on or off*/}}>
        Toggle Search Menu
      </button>
      <>{searchBarEnabled ? <CardSearch/> : "" }</>
    </div>
  )
}

export default App
