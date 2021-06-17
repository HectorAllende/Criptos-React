import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMondeda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';
import axios from 'axios';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    const [error, guardarError]= useState(false)

    const [listacripto, guardarListaCripto] =useState([])


    const opciones =[
        {codigo: 'USD', nombre:'Dolar de Estados Unidos'},
        {codigo:'EUR', nombre:'Euro'},
        {codigo:'ARS', nombre:'Peso Argentino'}
    ]

    const [moneda, SelectMoneda]= useMoneda('Elige tu moneda', '',opciones)
    const [cripto, SelectCripto]= useCriptomoneda('Elige tu criptomoneda','', listacripto)

   useEffect(() => {
       const consultarAPI=async()=>{
           const url ='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
           const resultado = await axios.get(url)
           guardarListaCripto(resultado.data.Data)

       }
       consultarAPI()
  
    }, [])

    const cotizar=(e)=>{
        e.preventDefault()

        if(moneda===''|| cripto===''){
            guardarError(true)
            return;
        }

        guardarError(false)
        guardarMoneda(moneda)
        guardarCriptomoneda(cripto)



    }

    return (
        
        
        <form
            onSubmit={cotizar}
        >
            {error && <Error mensaje="Todos los campos son obligatorios"/> }
            <SelectMoneda/>

            <SelectCripto/>

            <Boton
                type="submit"
                value="Calcular"
            
            />
        </form>


     );
}
 
export default Formulario;