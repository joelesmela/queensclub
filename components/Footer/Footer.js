import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './footer.module.css';
import classes from '../../styles/Forms.module.css';
import logo from '../../public/images/logo1.png';

const Footer = () => {
  return (
    <footer>
      <div className='container'>
        <div className='row flex-lg-row flex-column-reverse'>
          <div className='col-lg-6 col-md-12 col-12 mb-4 d-flex justify-content-center align-items-center'>
            <div className='w-75'>
              <h4 className={`m-3 text-center ${styles.title}`}>Suscríbete</h4>
              <p className={`mt-2 ${styles.text}`}>Reciba mensualmente todas las novedades de nuestras modelos directamente en su bandeja de entrada. También obtendrás ofertas exclusivas sólo disponibles a través de nuestros boletines.</p>
              <form>
                <div className="input-group">
                  <input type="email" className={`form-control ${classes.placeholder}`} placeholder="Email" aria-label="Email" required />
                  <button type="submit" className={`input-group-text ${classes.button}`}>Suscríbete</button>
                </div>
              </form>
            </div>
          </div>
          <div className='col-lg-6 col-md-12 col-12 mt-3 align-items-center d-flex justify-content-center'>
            <div className='w-75'>
              <Link href='/' passHref>
                <a>
                  <Image src={logo} alt='My Queens Club' height={2250} width={4000} quality={100}/>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-12'>
            <h4 className={`pt-4 pt-md-3 text-center ${styles.title}`}>Términos y condiciones</h4>
            <div className='row'>
              <Link href='/about' passHref>
                <a className={`text-decoration-none text-center p-2 ${styles.condition}`} href='#'>Sobre Nosotros</a>
              </Link>
              <Link href='/politics' passHref>
                <a className={`text-decoration-none text-center p-2 ${styles.condition}`} href='#'>Políticas de privacidad</a>
              </Link>
              <Link href='/terms' passHref>
                <a className={`text-decoration-none text-center p-2 ${styles.condition}`} href='#'>Términos y condiciones</a>
              </Link>
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-12'>
            <h4 className={`pt-4 pt-md-3 text-center ${styles.title}`}>Redes Sociales</h4>
            <div className='d-flex justify-content-center py-3'>
              <a href="https://www.facebook.com/myqueensclub" target='_blank' rel='noreferrer' className={`pe-2 ${styles.icon}`}><i className="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/myqueensclub/?hl=es" target='_blank' rel='noreferrer' className={`ps-2 ${styles.icon}`}><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6 col-md-12 py-3'>
            <p className={`m-0 text-center ${styles.title}`}>My Queens Club - Todos los derechos reservados © 2022</p>
          </div>
          <div className='col-lg-6 col-md-12 py-3'>
            <p className={`m-0 text-center ${styles.title}`}>
              Sitio web realizado por
              <a href="https://www.linkedin.com/in/fabricio-alberto-597b17220/" className={`text-decoration-none ${styles.condition}`} target='_blank' rel='noreferrer'> Fabricio Alberto </a>
               y
              <a href="https://www.linkedin.com/in/facundo-nahuel-casal-471869208/" className={`text-decoration-none ${styles.condition}`} target='_blank' rel='noreferrer'> Facundo Casal</a>
              </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
