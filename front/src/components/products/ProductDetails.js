import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from "../layout/MetaData"
import { useParams } from 'react-router-dom'
import { getProductDetails, clearErrors} from '../../actions/productActions'
import { useAlert} from 'react-alert'
import { Carousel } from 'react-bootstrap'


export const ProductDetails = () => {
   const {loading, product, error} = useSelector(state =>state.productDetails)
   const {id} =useParams();
   const dispatch= useDispatch();
   const alert= useAlert();
   const [quantity, setQuantity] = useState(1)

   useEffect(() => {
    dispatch(getProductDetails(id))
    if (error){
      alert.error(error);
      dispatch(clearErrors())
    }

   }, [dispatch, alert, error, id])

   const increaseQty = () => {
      const contador = document.querySelector('.count')

      if (contador.valueAsNumber>=product.inventario) return;

      const qty = contador.valueAsNumber+1;
      setQuantity(qty)
   }

   const decreaseQty = () => {
    const contador = document.querySelector('.count')

    if (contador.valueAsNumber <= 1) return;

    const qty = contador.valueAsNumber-1;
    setQuantity(qty)
 }

  return (
   <Fragment>
    {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> :(
      <Fragment>
      <MetaData title={product.nombre}></MetaData>
      <div className='row d-flex justify-content-around'>
          <div className='col-12 col-lg-5 img-fluid' id="imagen_producto">
              <Carousel pause='hover'>
                {product.imagen && product.imagen.map(img =>(
                  <Carousel.Item key={img.public_id}>
                    <img className="d-block w-100" src={"../"+img.url} alt={product.nombre}></img>
                  </Carousel.Item>
                ))}
              </Carousel>
          </div>

          <div className='col-12 col-lg-5 mt-5'>
              <h3>{product.nombre}</h3>
              <p id="product_id">ID del Producto {product._id}</p>
              <hr />

              <div className='rating-outer'>
                <div className="rating-inner" style={{width: `${(product.calificacion/5)*100}%`}}></div>
              </div>
              <span id="No_de_reviews">  ({product.numCalificaciones} Reviews)</span>
              <hr />
              <p id="precio_producto">${product.precio}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                <input type="number" className="form-control count d-inline" value={quantity} readOnly/>
                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
              </div>
              <button type="button" id="carrito_btn" className="btn btn-primary d-inline ml-4" disabled={product.inventario===0}>Agregar al Carrito</button>
              <hr />
              <p>Estado: <span id="stock_stado" className={product.inventario>0 ? 'greenColor':'redColor'}>{product.inventario>0 ? "En existencia": "Agotado"}</span></p>
              <hr />
              <h4 className="mt-2">Descripción:</h4>
              <p>{product.descripcion}</p>
              <hr />
              <p id="vendedor">Vendido por: <strong>{product.vendedor}</strong></p>
              <button id="btn_review" type="button" className="btn btn-primary mt-4" 
              data-toggle="modal" data-target="#ratingModal">Deja tu Opinion</button>
              <div className="alert alert-danger mt-5" type="alert">Inicia Sesión para dejar tu review</div>
          
              {/*Mensaje emergente para dejar opinion y calificacion*/}
              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog"
                  aria-labelledby='ratingModalLabel' aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">Enviar Review</h5>
                          <button type="button" className='close' data-dismiss="modal" aria-label='Close'>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                          </ul>

                          <textarea name="review" id="review" className="form-control mt3"></textarea>

                          <button className="btn my-3 float-right review-btn px-4 text-white" 
                          data-dismiss="modal" aria-label="Close">Enviar</button>
                        
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
          </div>
      </div>
  </Fragment>
    )}
   </Fragment>
    
  )
}

