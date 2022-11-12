import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, updatePassword } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import MetaData from '../layout/MetaData'

export const UpdatePassword = () => {
    const [oldPassword, setOldPassword]= useState("")
    const [newPassword, setNewPassword]= useState("")
    const navigate = useNavigate();
    const alert= useAlert();
    const dispatch= useDispatch();

    const {error, isUpdated, loading} = useSelector(state => state.user)

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isUpdated){
            alert.success("Contraseña Actualizada Correctamente")
            navigate("/yo")

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    },[dispatch, alert, error, isUpdated])

const submitHandler= (e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("newPassword", newPassword);

    dispatch(updatePassword(formData))
}

  return (
    <Fragment>
            <MetaData title={'Cambiar contraseña'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Actualizar Contraseña</h1>
                        <div className="form-group">
                            <label for="old_password_field">Contraseña Anterior</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label for="new_password_field">Nueva Contraseña</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" 
                        disabled={loading ? true : false} >Actualizar Contraseña</button>
                    </form>
                </div>
            </div>

        </Fragment>
  )
}
