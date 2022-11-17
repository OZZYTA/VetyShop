import React, { Fragment, useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import MetaData from '../layout/MetaData'
import { useParams} from "react-router-dom"

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, newReview, clearErrors } from '../../actions/productActions'
import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import ListReviews from '../order/ListReviews'

export const ProductDetails = () => {
    const params= useParams();
    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0);
    const [comentario, setComentario] = useState('');

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, product } = useSelector(state => state.productDetails)
    const { user } = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview)

    useEffect(() => {
        dispatch(getProductDetails(params.id))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Opinion registrada correctamente')
            dispatch({ type: NEW_REVIEW_RESET })
        }

    }, [dispatch, alert, error, reviewError, params.id, success])

  const increaseQty = () => {
    const contador = document.querySelector('.count')

    if (contador.valueAsNumber >= product.inventario) return;

    const qty = contador.valueAsNumber + 1;
    setQuantity(qty)
  }

  const decreaseQty = () => {
    const contador = document.querySelector('.count')

    if (contador.valueAsNumber <= 1) return;

    const qty = contador.valueAsNumber - 1;
    setQuantity(qty)
  }

  const addToCart = () => {
    dispatch(addItemToCart(params.id, quantity));
    alert.success('Producto agregado al carro')
  }

  function setUserRatings() {
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings);
      })
    })

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === 'click') {
          if (index < this.starValue) {
            star.classList.add('orange');

            setRating(this.starValue)
          } else {
            star.classList.remove('orange')
          }
        }

        if (e.type === 'mouseover') {
          if (index < this.starValue) {
            star.classList.add('yellow');
          } else {
            star.classList.remove('yellow')
          }
        }

        if (e.type === 'mouseout') {
          star.classList.remove('yellow')
        }
      })
    }
  }
  const reviewHandler = () => {
    const formData = new FormData();

    formData.set('rating', rating);
    formData.set('comentario', comentario);
    formData.set('idProducto', params.id);

    dispatch(newReview(formData));
  }


  return (
    <Fragment>
      {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
        <Fragment>
          <MetaData title={product.nombre}></MetaData>
          <div className='row d-flex justify-content-around'>
            <div className='col-12 col-lg-5 img-fluid' id="imagen_producto">
              <Carousel pause='hover'>
                {product.imagen && product.imagen.map(img => (
                  <Carousel.Item key={img.public_id}>
                    <img className="d-block w-100" src={img.url} alt={product.nombre}></img>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <div className='col-12 col-lg-5 mt-5'>
              <h3>{product.nombre}</h3>
              <p id="product_id">ID del Producto {product._id}</p>
              <hr />

              <div className='rating-outer'>
                <div className="rating-inner" style={{ width: `${(product.calificacion / 5) * 100}%` }}></div>
              </div>
              <span id="No_de_reviews">  ({product.numCalificaciones} Reviews)</span>
              <hr />
              <p id="precio_producto">${product.precio}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                <input type="number" className="form-control count d-inline" value={quantity} readOnly />
                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
              </div>
              <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.inventario === 0} onClick={addToCart}>Agregar al Carrito</button>
              <hr />
              <p>Estado: <span id="stock_stado" className={product.inventario > 0 ? 'greenColor' : 'redColor'}>{product.inventario > 0 ? "En existencia" : "Agotado"}</span></p>
              <hr />
              <h4 className="mt-2">Descripción:</h4>
              <p>{product.descripcion}</p>
              <hr />
              <p id="vendedor">Vendido por: <strong>{product.vendedor}</strong></p>

              {user ?
                <button id="btn_review" type="button" className="btn btn-primary mt-4"
                  data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>Deja tu Opinion</button>
                :
                <div className="alert alert-danger mt-5" type="alert">Inicia Sesión para dejar tu review</div>
              }

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

                          <textarea name="review" 
                          id="review" 
                          className="form-control mt3"
                          value={comentario}
                          onChange={(e) => setComentario(e.target.value)}
                          ></textarea>

                          <button className="btn my-3 float-right review-btn px-4 text-white"
                            onClick={reviewHandler} data-dismiss="modal" aria-label="Close">Enviar</button>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          {product.opiniones && product.opiniones.length > 0 && (
                        <ListReviews opiniones={product.opiniones} />
                    )}
        </Fragment>
      )}
    </Fragment>

  )
}

