import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './editAccount.module.css';
import clientAxios from '../../config/clientAxios';

const EditAccount = ({
  name, lastName, userName, email,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [menssage, setMenssage] = useState('');
  const {
    register, handleSubmit, formState: { errors }, reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setIsValid(false);
      return;
    }
    const resp = await clientAxios.post('user/changepassword', data);

    if (resp.data.status === 500) {
      setMenssage(resp.data.message);
    }

    if (resp.status === 200) {
      setMenssage(resp.data.message);
      window.location.reload(true);
    }
  };

  return (
     <div className="container w-100">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className="row m-3">
        <div className="col-12 d-flex justify-content-between mb-4">
          <div className="col-5">
            <label className={`form-label ${styles.formLabel}`}>Nombre</label>
            <input type="text" className={`form-control form-control-sm ${styles.formPlaceholder} ${styles.text} `} id="nameUser" defaultValue={name} {...register('name', { required: true })}/>
            {errors.name && <p className={`mb-3 ${styles.text}`}>* Este campo es requerido</p>}
          </div>
          <div className="col-5">
            <label className={`form-label ${styles.formLabel}`}>Apellido</label>
            <input type="text" className={`form-control form-control-sm ${styles.formPlaceholder} ${styles.text}`} id="lastNameUser" defaultValue={lastName} {...register('lastName', { required: true })}/>
            {errors.lastName && <p className={`mb-3 ${styles.text}`}>* Este campo es requerido</p>}
          </div>
        </div>
        <div className="col-12 mb-4">
          <label className={`form-label ${styles.formLabel}`}>Nombre de Usuario</label>
          <input
            type="text"
            className={`form-control form-control-sm ${styles.formPlaceholder} ${styles.text}`}
            id="nameVisibleUser"
            defaultValue={userName}
            aria-describedby="nameVisibleUser"
            {...register('userName', {
              required: '* Este campo es requerido',
              minLength: { value: 4, message: '* El nombre de usuario de contener entre 4 y 10 caracteres' },
              maxLength: { value: 10, message: '* El nombre de usuario de contener entre 4 y 10 caracteres' },
            })}
          />
          <div id="nameVisibleUser" className={`form-text fst-italic ${styles.formLabel}`}>
            Así será como se mostrará tu nombre en la sección de tú cuenta y en las valoraciones.
            {errors.userName && <p className={`mb-3 ${styles.text}`}>{errors.userName.message}</p>}
          </div>
        </div>
        <div className="col-12 mb-4">
          <label className={`form-label ${styles.formLabel}`}>Correo electrónico</label>
          <input type="email" className={`form-control form-control-sm ${styles.formPlaceholder} ${styles.text}`} id="mailUser" defaultValue={email} {...register('email', { required: true })}/>
          {errors.email && <p className={`mb-3 ${styles.text}`}>* Este campo es requerido</p>}
        </div>

        <div className="col-12 d-flex justify-content-center flex-column border p-3 m2 cardPassword">
          <h5 className={ styles.formLabel }>Cambio de contraseña</h5>
          <div className="card-body">
            {/* <div className="mb-4">
              <label className={`form-label ${styles.formLabel}`}>Contraseña actual</label>
              <input type="password" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="passOld" aria-describedby="passOldHelp"  {...register('passOld', { required: true })}/> */}
              {/* <div id="passOldHelp" className={`form-text fst-italic ${styles.formLabel}`}>Dejar en blanco para no cambiar.</div> */}
              {/* {errors.passOld && <p className={`mb-3 ${styles.text}`}>* Este campo es requerido para realizar cambios  </p>}
            </div> */}
            <div className="mb-4">
              <label className={`form-label ${styles.formLabel}`}>Contraseña nueva</label>
              <input type="password" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="passNew" aria-describedby="passNewHelp" {...register('password', { minLength: { value: 8, message: '* La contraseña debe contener al menos 8 caracteres y una mayúscula' } })} />
              <div id="passNewHelp" className={`form-text fst-italic ${styles.formLabel}`}>Dejar en blanco para no cambiar.</div>
              {errors.password && <p className={`mb-3 ${styles.text}`}>{errors.password.message}</p>}
            </div>
            <div className="mb-4">
              <label className={`form-label ${styles.formLabel}`}>Confirmar nueva contraseña</label>
              <input type="password" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="passRepeat" aria-label="confirmPassword" aria-describedby="passRepeatHelp" {...register('confirmPassword')}/>
              <div id="passRepeatHelp" className={`form-text fst-italic ${styles.formLabel}`}>Dejar en blanco para no cambiar.</div>
            </div>
            {isValid === false && <p className={`mb-3 ${styles.text}`}>Las contraseñas no coinciden</p>}
          </div>
        </div>
        <div className="mb-4">
              <label className={`form-label ${styles.formLabel}`}>Contraseña actual</label>
              <input type="password" className={`form-control form-control-sm ${styles.formPlaceholder}`} id="passOld" aria-describedby="passOldHelp" {...register('passOld', { required: true })}/>
              {/* <div id="passOldHelp" className={`form-text fst-italic ${styles.formLabel}`}>Dejar en blanco para no cambiar.</div> */}
              {errors.passOld && <p className={`mb-3 ${styles.text}`}>* Este campo es requerido para realizar cambios  </p>}
            </div>
            <p className={`mb-3 ${styles.text}`}>{menssage}</p>
        <div className="w-100 me-5 text-end">
          <button type="submit" className={`btn ${styles.button}`}>Guardar cambios</button>
        </div>
      </form>
     </div>
  );
};

export default EditAccount;
