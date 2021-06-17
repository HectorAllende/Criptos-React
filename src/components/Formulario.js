import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMondeda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';
import axios from 'axios';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;

    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const ResultadoDiv = styled.div`
   
    font-family: Arial, Helvetica, sans-serif;

`

const Info = styled.p`
    font-size: 18px;
    span {
        font-weight:bold;
    }
`;
const Precio = styled.p`
    font-size: 30px;

    span {
        font-weight:bold;
    }
`

const Formulario = ({ cargando, resultado, guardarMoneda, guardarCriptomoneda }) => {


    // Configuración del modal de material-ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();



    const handleOpen = () => {


        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }



    const [error, guardarError] = useState(false)

    const [listacripto, guardarListaCripto] = useState([])


    const opciones = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'ARS', nombre: 'Peso Argentino' }
    ]

    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', opciones)
    const [cripto, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listacripto)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
            const resultado = await axios.get(url)
            guardarListaCripto(resultado.data.Data)

        }
        consultarAPI()

    }, [])

    const cotizar = (e) => {
        e.preventDefault()

        if (moneda === '' || cripto === '') {
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



            {error ? <Error mensaje="Todos los campos son obligatorios" /> : (

                <Modal
                    open={open}
                    onClose={() => {
                        handleClose();
                    }}
                >

                    <div style={modalStyle} className={classes.paper}>

                        <ResultadoDiv>
                            <Precio>La cotización es: <span>{resultado.PRICE}</span> </Precio>
                            <Info>Precio más alto del día: <span>{resultado.HIGHDAY}</span> </Info>
                            <Info>Precio más bajo del día: <span>{resultado.LOWDAY}</span> </Info>
                            <Info>Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}%</span> </Info>
                            <Info>Última Actualización: <span>{resultado.LASTUPDATE}</span> </Info>
                        </ResultadoDiv>

                    </div>
                </Modal>


            )}


            <SelectMoneda />

            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
                onClick={() => handleOpen()}

            />
        </form>


    );
}

export default Formulario;