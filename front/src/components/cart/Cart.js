import React, { Fragment} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'
import MetaData from '../layout/MetaData'


const Cart = () => {
    const navigate=useNavigate()
    const dispatch= useDispatch();
    const {cartItems} = useSelector(state => state.cart)
    const {user} =useSelector(state => state.auth)

    const increaseQty = (id, quantity, inventario) => {
        const newQty = quantity+1;
        if (newQty > inventario) return;
        dispatch(addItemToCart(id, newQty))
     }
  
     const decreaseQty = (id, quantity) => {
        const newQty = quantity-1;
        if (newQty <= 0) return;
        dispatch(addItemToCart(id, newQty))
   }

   const checkOutHandler = () =>{
        if (user){
            navigate("/shipping")
        }
        else{
            navigate("/login")
        }
   }

   const removeCartItemHandler= (id)=>{
    dispatch(removeItemFromCart(id))
   }

    return (
        <Fragment>
            <MetaData title={'Mi carrito'} />
            

            {cartItems.length === 0 ? <h2 className="mt-5">Su carrito esta vacio</h2> : (
                <Fragment>
                    
                    <h2 className="mt-5">Su Carrito: <b>{cartItems.reduce((acc, item)=>(acc+Number(item.quantity)),0)} items</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">

                        {cartItems && cartItems.map(item => (
                                <Fragment>
                                    <hr />

                                    <div className="cart-item" key={item.nombre}>
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.imagen} alt={item.nombre} height="90" width="115" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/producto/${item.product}`}>{item.nombre}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${item.precio}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>

                                                    <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                    <span className="btn btn-primary plus" onClick={()=>increaseQty(item.product, item.quantity, item.inventario)}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)}></i>
                                            </div>

                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            
                        ))}
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Total de la Compra</h4>
                                <hr />
                                <p>Productos:  <span className="order-summary-values">{cartItems.reduce((acc, item)=>(acc+Number(item.quantity)),0)} (Unidades)</span></p>
                                <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item)=> acc+(item.quantity*item.precio),0).toFixed(2)}</span></p>

                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkOutHandler}>Comprar!</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart