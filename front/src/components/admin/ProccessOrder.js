import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateOrder, clearErrors } from '../../actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'

export const ProcessOrder = () => {
    const navigate = useNavigate();
    const params=useParams();

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { envioInfo, items, pagoInfo, user, precioTotal, estado : estadoOrder } = order
    const { error, isUpdated } = useSelector(state => state.order)
    const [estado, setEstado] = useState(estadoOrder);

    const orderId = params.id;

    useEffect(() => {

        dispatch(getOrderDetails(orderId))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }


        if (isUpdated) {
            alert.success('Orden Actualizada Correctamente');
            dispatch({ type: UPDATE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isUpdated, orderId])


    const updateOrderHandler = (id) => {
        const formData = new FormData();
        formData.set('estado', estado);

        dispatch(updateOrder(id, formData))
    }

    const detallesEnvio = envioInfo && `${envioInfo.direccion}, ${envioInfo.ciudad}, ${envioInfo.departamento}`
    const isPaid = pagoInfo && pagoInfo.estado === 'Aceptado' ? true : false

    return (
        <Fragment>
            <MetaData title={`Procesar Orden # ${order && order._id}`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">

                                    <h2 className="my-5">Orden # {order._id}</h2>

                                    <h4 className="mb-4">Información del envio</h4>
                                    <p><b>Nombre:</b> {user && user.nombre}</p>
                                    <p><b>Telefono:</b> {envioInfo && envioInfo.telefono}</p>
                                    <p className="mb-4"><b>Direccón: </b>{detallesEnvio}</p>
                                    <p><b>Valor Total:</b> ${precioTotal}</p>

                                    <hr />

                                    <h4 className="my-4">Pago</h4>
                                    <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAGO" : "PENDIENTE DE PAGO"}</b></p>

                                    <h4 className="my-4">No. Transacción</h4>
                                    <p><b>{pagoInfo && pagoInfo.id}</b></p>

                                    <h4 className="my-4">Estado de la Orden:</h4>
                                    <p className={order.estado && String(order.estado).includes('Entregado') ? "greenColor" : "redColor"} ><b>{estado}</b></p>



                                    <h4 className="my-4">Items comprados:</h4>

                                    <hr />
                                    <div className="cart-item my-1">
                                        {items && items.map(item => (
                                            <div key={item.producto} className="row my-5">
                                                <div className="col-4 col-lg-2">
                                                    <img src={item.imagen} alt={item.nombre} height="45" width="65" />
                                                </div>

                                                <div className="col-5 col-lg-5">
                                                    <Link to={`/producto/${item.producto}`}>{item.nombre}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p>${item.precio}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <p>{item.cantidad} Unidad(es)</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Estado</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={estado}
                                            onChange={(e) => setEstado(e.target.value)}
                                        >
                                            <option value="Procesando">Procesando</option>
                                            <option value="Enviado">Enviado</option>
                                            <option value="Entregado">Entregado</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
                                        Actualizar Estado
                                    </button>
                                </div>
                               
                            </div>
                        )}
                    </Fragment>
                    <button className="btn ml-4" id="login_btn" onClick={() => navigate(-1)}>Atrás</button>
                </div>
            </div>

        </Fragment>
    )
}

export default ProcessOrder