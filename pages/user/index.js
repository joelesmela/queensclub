import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import styles from '../../styles/Home.module.css';
import EditAccount from '../../components/EditAccount/EditAccount';
import clientAxios from '../../config/clientAxios';
import TableBuy from '../../components/TableBuy/TableBuy';
import TableSus from '../../components/TableSus/TableSus';

const User = () => {
  const [user, setUser] = useState(1);
  const router = useRouter();
  const [compras, setCompras] = useState([]);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('client');
  const [email, setEmail] = useState('');
  const token = localStorage.getItem('accessToken');
  const userToken = token ? jwtDecode(token) : false;
  const [userName, setUserName] = useState('');
  const [idUser, setIdUser] = useState(userToken ? userToken.userId : '');

  const infoUser = async () => {
    const response = await clientAxios.get(`user/${idUser}`);
    setRole(response.data.role);
    setName(response.data.name);
    setLastName(response.data.lastName);
    setEmail(response.data.email);
    setUserName(response.data.userName);
  };

  const getCompras = async () => {
    const response = await clientAxios.get(`purchase/${idUser}`);
    setCompras(response.data);
  };

  if (localStorage.getItem('accessToken') === null) {
    router.push('/');
  }

  useEffect(() => {
    infoUser();
    getCompras();
  }, []);

  return (
    <div className={styles.controlUser}>
      <div className="text-center py-5">
        <h5 className={styles.title}>Editar cuenta</h5>
        <span className={` text-normal ${styles.text} `}>Bienvenido {name}. En esta sección verás toda la información detallada de tú cuenta.</span>
      </div>
      <section className='row gx-0'>
        <section className="d-flex col-12 col-md-4 col-lg-4">
          <div className="border-end">
            <div className="d-flex justify-content-center flex-wrap">
              <div className="mt-3 d-flex align-items-center justify-content-between">
                <i className={`bi bi-person-circle ${styles.icoUser}`}></i>
              </div>
              <div className="w-100">
                <nav className="nav flex-column mt-5">
                  <div className={`nav-link ${styles.column}`}>
                    <span onClick={() => setUser(1)}>Editar cuenta</span>
                  </div>
                  {role === 'client'
                    ? <div className={`nav-link ${styles.column}`}>
                      <span onClick={() => setUser(2)}>Mis pedidos</span>
                    </div>
                    : <div className={`nav-link ${styles.column}`}>
                      <span onClick={() => setUser(2)}>Mis Ventas</span>
                    </div>}
                  {role === 'client'
                    && <div>
                      <div className={`nav-link ${styles.column}`}>
                        <span onClick={() => setUser(4)}>Suscripciones</span>
                      </div>
                    </div>}
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section className='col-12 col-md-8 col-lg-7'>
          {user === 1 && <EditAccount name={name} lastName={lastName} userName={userName} email={email} />}
          {user === 2 && <TableBuy role={role} data={compras} key={userName} />}
          {user === 4 && <TableSus data={compras} key={userName} />}
        </section>
      </section>
    </div>
  );
};

/* export const getStaticProps = async () => {
  return {
    props: { purchase: compras },
  };
}; */

export default User;
