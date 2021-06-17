import React, {useState} from 'react';
import styled from '@emotion/styled';


const Label = styled.label`
    font-family: 'Big Shoulders Stencil Display', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.5rem;
    margin-top: 2rem;
    display: block;
    margin-bottom: 1rem;
`;

const Select = styled.select`
    width: 100%;
    display:block;
    padding: 0.5rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`

const useCriptomoneda = (label, stateInicial, opciones) => {

    const [state, actualizarState]= useState(stateInicial)

    const Selecionar=()=>(

        <>
            <Label>{label}</Label>

            <Select
                onChange={e=>actualizarState(e.target.value)}
                value={state}
            >
                <option value="">--Seleccione--</option>
                {opciones.map(opcion=>(
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}
            </Select>


        </>

    )



    return [state, Selecionar];
}
 
export default useCriptomoneda;