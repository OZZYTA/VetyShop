import React, { Fragment, useEffect } from 'react'
import MetaData from "../layout/MetaData"
import { MDBDataTable } from "mdbreact"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, myOrders } from '../../actions/orderActions'
import { Link } from "react-router-dom"

export const ListOrder = () => {
    const { loading, error, orders } = useSelector(state => state.myOrders)
    const alert = useAlert();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(myOrders())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Fecha",
                    field: "fecha",
                    sort: "asc"
                },
                {
                    label: "Id del Pedido",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Cantidad de Items",
                    field: "cantidadItems",
                    sort: "asc"
                },
                {
                    label: "Costo",
                    field: "costo",
                    sort: "asc"
                },
                {
                    label: "Estado",
                    field: "estado",
                    sort: "asc"
                },
                {
                    label: "Acciones",
                    field: "acciones",
                    sort: "asc"
                },
            ],
            rows: []
        }


        orders.forEach(order => {
            var fecha = new Date(order.fechaCreacion).toLocaleDateString()
            data.rows.push({
                fecha: fecha,
                id: order._id,
                cantidadItems: order.items.length,
                costo: `$${order.precioTotal}`,
                estado: order.estado && String(order.estado).includes("Entregado")
                    ? <p style={{ color: "green" }}>{order.estado}</p>
                    : <p style={{ color: "red" }}>{order.estado}</p>,
                acciones:
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className='fa fa-eye'></i></Link>
            })
        })
        return data;
    }

    return (
        <Fragment>

            <MetaData title={'Mis Pedidos'} />

            <h1 className="my-5">Mis Pedidos</h1>

            {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                <MDBDataTable
                    data={setOrders()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            )}

        </Fragment>
    )
}
