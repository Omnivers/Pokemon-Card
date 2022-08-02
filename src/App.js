import { useEffect, useState } from 'react'
import "./App.css";
import background from "./images/pokemon.gif";
import defaultBackgroundImage from './images/pokemon.jpg';


const App = () => { 
  let random=1; // Pour le premier pokemon qui sera afficher dans notre page
  const [pokemons, setPokemons] = useState(null);
  const [ClassName, setClassName] = useState("card");
  const fetchData = async () => {
    const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);//On utilise Random qu'on a défini au paravent pour definir l'ID
    const response = await request.json()
    setPokemons(response)
  }
  useEffect(()=>{
    fetchData()
  },[])


//Functions :

  const randomNumber= async ()=>{ //On click button lance à nouveau le fetch juste en dessous
    random = Math.floor(Math.random() * 151) + 1 //Pour randomiser entre 1 et 151
    const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
    const response = await request.json()
    setPokemons(response) // Montre le Pokemon randomisé
  }
  const changeBodyBackground=()=>{//Change le background après le onclick
    document.body.style.backgroundImage = `url(${background})`;
    setTimeout(defaultBackground,1000)
  }
  const defaultBackground=()=>{//Remet le background par defaut suite à l'affichage du pokemon random
    document.body.style.backgroundImage= `url(${defaultBackgroundImage})`;
    setClassName("card")
  }
  const animation =()=>{//ajoute une animation lors de l'affichage du pokemon
    setClassName("card pokemon")
  }
  const capitalizeFirstLetter=(string) => {// Ajoute une maj au début de chaque string 
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  return(
    <div className='container d-flex justify-content-center mt-4'>
  {pokemons===null?(// condition qui :
      <>
      <div className='d-flex justify-content-center'>Loading</div> {/*Affiche un loading avant que la valeur de pokemon ne soit attribué */}
      {console.log('test')}
      </>
  ):( // Sinon elle affiche notre pokemon :
    <div className={ClassName} style={{width:'20rem'}}>
    <img src={pokemons.sprites.other['official-artwork'].front_default} className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">{capitalizeFirstLetter(pokemons.name)}</h5>
      <p className="card-text">Height : <span className='numero'>{pokemons.height}</span></p>
      <p className="card-text">Weight : <span className='numero'>{pokemons.weight}</span></p>
      <p className='card-text'>Type :</p>
      {pokemons.types.map((pokemon)=>(// Type est un objet constitué de plusieur index du coup on le map pour afficher chaque type 
         <li key={pokemon.type.name} className="list-group-item list-group-item-action list-group-item-dark d-flex justify-content-center">{capitalizeFirstLetter(pokemon.type.name)}</li>
         ))}
      <a href="#" className="btn btn-outline-dark p-3 m-2 fs-4 text" onClick={()=>{randomNumber();changeBodyBackground();animation()} }>Show another random Pokemon</a> {/*Boutton pour randomiser la selection du Pokemon*/}
    </div>
    </div>
  )}
  </div>
)}



export default App