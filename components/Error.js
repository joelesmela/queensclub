import React, { useState } from 'react';
import Image from 'next/image';
import Login from './Login/Login';

const Error = ({ texto, number }) => {
  const [open, setOpen] = useState(false);

  return (
    <section className='d-flex flex-column align-items-center justify-content-center'
      style={{ height: '100vh', backgroundColor: '#050914', color: '#ffff' }}>
      {
        open
          ? <>
        <button onClick={() => setOpen(!open)} className='btn btn-primary mb-3'> Cancelar</button>
        <h3>LOGIN</h3>
        <Login />
        </>
          : <>
            <h1 style={{ color: '#D44F81' }}>ERROR {number && number}</h1>
            <h3 style={{ textAlign: 'center' }}>{texto}</h3>
            <Image width={147.6} height={61} src='/images/logo.png' alt='logo' quality={100} />
            <div className='d-flex flex-column align-items-center justify-content-center ' style={{ marginTop: '60px' }}>
              <h6>Si eres administrador o queen inicia sesion</h6>

              <button onClick={() => setOpen(!open)} className='btn btn-primary' > Iniciar sesion</button>
            </div>
          </>
      }

    </section>

  );
};

export default Error;
