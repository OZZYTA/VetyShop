import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, newProduct } from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'


const NewProduct = () => {
    const { loading, error, success } = useSelector(state => state.newProduct)
    const [nombre, setNombre] = useState("")
    const [precio, setPrecio] = useState(0)
    const [descripcion, setDescripcion] = useState("")
    const [categoria, setCategoria] = useState("")
    const [inventario, setInventario] = useState(0)
    const [vendedor, setVendedor] = useState("")
    const [imagen, setImagen] = useState([])
    const [imagenPreview, setImagenPreview] = useState([])

    const categorias = [
        "Alimento seco",
        "Alimento humedo",
        "Accesorios",
        "Cuidado e Higiene",
        "Medicamentos",
        "Snacks",
        "Juguetes"
    ]

    const navigate = useNavigate()
    const alert = useAlert();
    const dispatch = useDispatch();

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors)
        }
        if (success) {
            navigate("/dashboard")
            alert.success("Producto registrado con exito")
            dispatch({ type: NEW_PRODUCT_RESET })
        }
    }, [dispatch, alert, error, success])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("nombre", nombre);
        formData.set("precio", precio)
        formData.set("descripcion", descripcion)
        formData.set("categoria", categoria)
        formData.set("inventario", inventario)
        formData.set("vendedor", vendedor)

        imagen.forEach(img => {
            formData.append("imagen", img)
        })

        dispatch(newProduct(formData))
    }

    const onChange = e => {
        const files = Array.from(e.target.files)

        setImagenPreview([])
        setImagen([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagenPreview(oldArray => [...oldArray, reader.result])
                    setImagen(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
        
    }
    return (
        <Fragment>
            <MetaData title={'Nuevo Producto'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='application/json'>
                                <h1 className="mb-4">Nuevo Producto</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Nombre</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Precio</label>
                                    <input
                                        type="number"
                                        id="price_field"
                                        className="form-control"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Descripcion</label>
                                    <textarea className="form-control"
                                        id="description_field"
                                        rows="8"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Categoria</label>
                                    <select className="form-control"
                                        id="category_field"
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}>
                                        {categorias.map(categoria => (
                                            <option key={categoria} value={categoria}>{categoria}</option>
                                        ))}

                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Inventario</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={inventario}
                                        onChange={(e) => setInventario(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Vendedor</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={vendedor}
                                        onChange={(e) => setVendedor(e.target.value)}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Imagenes</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Seleccione Imagen
                                        </label>
                                    </div>
                                    {imagenPreview.map(img => (
                                        <img src={img} key={img} alt="Vista Previa de la imagen"
                                            className='mt-3 mr-2' width="55" height="55" />
                                    ))}

                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    CREAR
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewProduct

//VALIDATIONERROR: PRODUCTOS VALIDATION FAILED: IMAGEN: CAST TO EMBEDDED FAILED FOR VALUE 