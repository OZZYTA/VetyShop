import React from 'react'
import {Link} from 'react-router-dom'

export const Product = ({producto}) => {
  return (
    <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
      <div className='card p-3 rounded'>
        <img className='card-img-top mx-auto' src={producto.imagen[0].url} alt={producto.imagen[0].public_id}></img>
        <div className='card-body d-flex flex-column'>
          <h5 id="titulo_producto"><Link to={`/producto/${producto._id}`}>{producto.nombre}</Link></h5>
          <div className='rating mt-auto'>
            <div className='rating-outer'>
              <div className='rating-inner' style={{ width: `${(producto.calificacion / 5) * 100}%` }}></div>
            </div>
            <span id="No_de_opiniones"> {producto.numCalificaciones} Reviews</span>
          </div>
          <p className='card-text'>${producto.precio}</p><Link to={`/producto/${producto._id}`} id="view_btn" className='btn btn-block'>
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  )
}
