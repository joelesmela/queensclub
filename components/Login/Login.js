import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './login.module.css';

const Login = () => {
  const [error, setError] = useState({});
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}login`, {
      method: 'POST',
      body: JSON.stringify({ ...data }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const json = await resp.json();
    if (json.status !== 400) {
      localStorage.setItem('accessToken', json.accessToken);
      localStorage.setItem('user_name', json.name);
      window.location.reload(true);
    } else {
      setError(json);
    }
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <span className={`input-group-text ${styles.icon}`}><i className="bi bi-person"></i></span>
          <input type="text" className={`form-control ${styles.placeholder}`} placeholder="Nombre de usuario / Correo electrónico *" aria-label="Email" {...register('user', { required: true })}/>
        </div>
          {errors.user && <p className={`mb-3 ${styles.text}`}>* Este campo es requerido</p>}
        <div className="input-group mb-3">
          <span className={`input-group-text ${styles.icon}`}><i className="bi bi-key"></i></span>
          <input type="password" className={`form-control ${styles.placeholder}`} placeholder="Contraseña *" aria-label="Password" {...register('password', { required: true })}/>
        </div>
          {errors.password && <p className={`mb-3 ${styles.text}`}>* Este campo es requerido</p>}
          {error.mensaje && <p className={`${styles.text}`}>* Los datos son incorrectos</p>}
        <div className='d-flex justify-content-between'>
          <div className="mb-3 pt-2 form-check">
            <input className={`form-check-input ${styles.checkBox}`} type="checkbox"/>
            <label className={`form-check-label ${styles.remember}`} htmlFor="flexCheckChecked">Recuérdame</label>
          </div>
          <a className={`pt-2 ${styles.password}`}>¿Has olvidado la contraseña?</a>
        </div>
        <button type="submit" className={`btn w-100 ${styles.button}`}>ACCEDER</button>
      </form>
  );
};

export default Login;
