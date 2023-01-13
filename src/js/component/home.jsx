import React, {useState, useEffect,useRef} from "react";

//create your first component
const Home = () => {
    //aca los useState
    const [lista, setLista] =useState([]);
    let[posicion,setPosicion]=useState(0)
    let play = useRef();
    
//aca los useEffect
    useEffect(()=>{
        //codigo a ejecutar
    console.log("La pagina se ha cargado exitosamente");
    fetch('https://assets.breatheco.de/apis/sound/songs') //1.ir a buscar info en la url
    .then((response)=>response.json()) //2.Convierte la respuesta en un json
    .then((data)=>setLista(data)) //3. GUarda el json en un objeto data
    }
    ,[])//cuando el array está vacio el va a cargar el codigo a ejecutar UNA vez cargada la pagina
    console.log(lista);

    function playMusic(url,index){
        if(play.current.paused){
            play.current.src= `https://assets.breatheco.de/apis/sound/${url}`
            play.current.play()

        } else {
            play.current.pause
        }
        setPosicion(index)
    }

    function playNext(){
        setPosicion(posicion++)
        play.current.src= `https://assets.breatheco.de/apis/sound/${lista[posicion].url}`
        play.current.play()
    }
    function playBack(){
        setPosicion(posicion--)
        play.current.src= `https://assets.breatheco.de/apis/sound/${lista[posicion].url}`
        play.current.play()
    }

        return (
            <>
            <div className="container w-50">
            
    {/* dibujamos la lista de canciones */}
            <div className="list-group bg-dark rounded-0">
        
                {lista.map((item,index)=><button className="btn btn-dark text-start rounded-0" onClick={() => playMusic(item.url,index)} type="button" key={index}>{index} {item.name} -</button>)}
            
            </div>

            <div className="d-flex justify-content-center bg-dark border-top">
            <button onClick={playBack}><i className="fa fa-backward"></i> </button>
                <audio ref={play} controls/>
                <button onClick={playNext}><i className="fa fa-forward"></i></button>
                
            </div>

            </div>
            </>
        );
    };
    
    export default Home;