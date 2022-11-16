import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
    return (
        <div className="checkout-progress d-flex justify-content-center mt-5">

            {shipping ? <Link to='/shippping' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Envio</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Envio</div>
                    <div className="triangle-incomplete"></div>
                </Link>}

            {confirmOrder ? <Link to='/order/confirm' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Confirmación de Orden</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Confirmación de Orden</div>
                    <div className="triangle-incomplete"></div>
                </Link>}

            {payment ? <Link to='/payment' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Pago</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Pago</div>
                    <div className="triangle-incomplete"></div>
                </Link>}

        </div>
    )
}

export default CheckoutSteps