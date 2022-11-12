import React, { Fragment, useEffect, useState } from 'react'
import MetaData from "../layout/MetaData"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'


export const UpdateProfile = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("")
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {
        if (user) {
            setNombre(user.nombre);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Perfil actualizado correctamente")
            dispatch(loadUser());

            navigate("/yo")

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, alert, error, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("nombre", nombre);
        formData.set("email", email);
        formData.set("avatar", avatar)

        dispatch(updateProfile(formData))
    }

    const onChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

    }

    return (
        <Fragment>
            <MetaData title={'ACTUALIZAR PERFIL'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Actualizar Perfil</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Nombre</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='nombre'
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className="rounded-circle"
                                            alt="Vista Previa del Avatar"></img>
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='images/*'
                                        onChange={onChange}

                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Elija un avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3"
                            disabled={loading ? true : false} >Actualizar Perfil</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
