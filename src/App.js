import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner'
import axios from 'axios'

const Contenedor = styled.div`
  max-width: 800px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
 font-family: 'Big Shoulders Stencil Display', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {

  const [moneda, guardarMoneda]= useState('')
  const [criptomoneda, guardarCriptomoneda]= useState('')
  const [resultado, guardarResultado]= useState({})
  const [cargando, guardarCargando]= useState(false)

  useEffect(() => {

    const cotizarCriptomoneda= async()=>{

      if(moneda==='') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const cotizacion = await axios.get(url)

      guardarCargando(true)

      setTimeout(() => {

        guardarCargando(false)
        guardarResultado(cotizacion.data.DISPLAY[criptomoneda][moneda])

        
        
      }, 3000);

    }

    cotizarCriptomoneda()
  }, [moneda, criptomoneda])

  console.log(resultado)
  const componente = (cargando)? <Spinner/> : <Cotizacion resultado={resultado}/>

  return (
    <Contenedor>

      <div>
        <Imagen
          src={imagen}
          alt="imagen cripto"
        />
      </div>

      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>

        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}

      </div>



    </Contenedor>
  );
}

export default App;
