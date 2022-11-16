import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'

export const Shipping = () => {
    const {shippingInfo}= useSelector(state=> state.cart)

    //const navigate= useNavigate()
    let Pais=require("./colombia.json")
    const [direccion, setDireccion]=useState("")
    const [ciudad, setCiudad]=useState("")
    const [departamento, setDepartamento]=useState("")
    const [telefono, setTelefono]=useState("")


  return (
    <Fragment>

    <MetaData title={'Información de envio'} />


    <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form className="shadow-lg" >
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
                            {Pais.map(ciudad => (
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
