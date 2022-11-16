import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate , Link} from 'react-router-dom'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckOutSteps';

export const ConfirmOrder = () => {
    const navigate=useNavigate();
    const { cartItems, shippingInfo} = useSelector(state => state.cart)
    const { user } = useSelector (state => state.auth)

    //calculemos los valores
    const precioItems= cartItems.reduce((acc, item) => acc+item.precio * item.quantity, 0)
    const precioEnvio= precioItems> 125000 ? 0: 12000
    const precioImpuesto = Number((0.19 * precioItems).toFixed(2))
    const precioTotal =(precioItems + precioEnvio + precioImpuesto).toFixed(2)

    const processToPayment=()=>{
        const data={
            precioItems: precioItems.toFixed(2),
            precioEnvio,
            precioImpuesto,
            precioTotal
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate("/payment")
    }
  return (
    <Fragment>

            <MetaData title={'Confirmar Orden'} />

            <CheckoutSteps shipping confirmOrder />

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Información de Envio</h4>
                    <p><b>Nombre:</b> {user && user.nombre}</p>
                    <p><b>Teléfono:</b> {shippingInfo.telefono}</p>
                    <p className="mb-4"><b>Dirección:</b> {`${shippingInfo.direccion}, ${shippingInfo.ciudad} ${shippingInfo.departamento}`}</p>

                    <hr />
                    <h4 className="mt-4">Productos en tu Carrito:</h4>

                    {cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.imagen} alt={item.nombre} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/producto/${item.product}`}>{item.nombre}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.precio} = <b>${(item.quantity * item.precio).toFixed(2)}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Resumen de la compra</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${precioItems}</span></p>
                        <p>Costo de Envío: <span className="order-summary-values">${precioEnvio}</span></p>
                        <p>Impuestos:  <span className="order-summary-values">${precioImpuesto}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${precioTotal}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Continuar con el pago</button>
                    </div>
                </div>


            </div>

        </Fragment>
  )
}
