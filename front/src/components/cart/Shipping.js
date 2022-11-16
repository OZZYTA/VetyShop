import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckOutSteps';

export const Shipping = () => {
    let Pais = require('./colombia.json');
    const navigate= useNavigate()
    const { shippingInfo } = useSelector(state => state.cart)

    const [direccion, setDireccion] = useState(shippingInfo.direccion)
    const [ciudad, setCiudad] = useState(shippingInfo.ciudad)
    const [telefono, setTelefono] = useState(shippingInfo.telefono)
    const [departamento, setDepartamento] = useState(shippingInfo.departamento)
    const [ciudades, setCiudades]= useState([])

    useEffect(()=>{
      Pais.forEach((depar)=>{
        if (depar.departamento===departamento){
            setCiudades(depar.ciudades)
        }
      })
    })
    const dispatch= useDispatch();

    const submitHandler= (e)=>{
        e.preventDefault()
        dispatch(saveShippingInfo({direccion, ciudad, telefono, departamento}))
        navigate("/order/confirm")
    }



    return (
        <Fragment>

            <MetaData title={'Información de envio'} />
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onClick={submitHandler}>
                        <h1 className="mb-4">Información de envio</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Dirección</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Telefono</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Departamento</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={departamento}
                                onChange={(e) => setDepartamento(e.target.value)}
                                required
                            >

                                {Pais.map(dep => (
                                    <option key={dep.departamento} value={dep.departamento}>
                                        {dep.departamento}
                                    </option>
                                ))}

                            </select>


                            <div className="form-group">
                                <label htmlFor="city_field">Ciudad</label>
                                <select
                                    id="city_field"
                                    className="form-control"
                                    value={ciudad}
                                    onChange={(e) => setCiudad(e.target.value)}
                                    required
                                >
                                    {ciudades.map(ciudad => (
                                        <option key={ciudad} value={ciudad}>
                                            {ciudad}
                                        </option>
                                    ))}
                                   

                                </select>
                            </div>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUAR
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Shipping