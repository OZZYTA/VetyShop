import React from 'react'

const ListReviews = ({ opiniones }) => {
    return (
        <div class="reviews w-75">
            <h3>Opiniones de Otros clientes:</h3>
            <hr />
            {opiniones && opiniones.map(opinion => (
                <div key={opinion._id} class="review-card my-3">
                    <div class="rating-outer">
                        <div class="rating-inner" style={{ width: `${(opinion.rating / 5) * 100}%` }}></div>
                    </div>
                    <p class="review_user">por {opinion.nombreCliente}</p>
                    <p class="review_comment">{opinion.comentario}</p>

                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ListReviews