/* eslint-disable no-underscore-dangle */
import { React, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import clientAxios from '../../config/clientAxios';
import GeneralModal from '../GeneralModal/GeneralModal';
import styles from './userViewer.module.css';

const UserViewer = () => {
  const [users, setUsers] = useState([]);
  const [usersAux, setUsersAux] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    clientAxios.get('/user')
      .then((response) => {
        if (response.status !== 400) {
          setIsLoading(true);
          setUsers(response.data);
          setUsersAux(response.data);
        } else {
          Swal.fire({
            icon: 'error',
            iconColor: '#D44F80',
            title: 'Ha ocurrido un error!',
            color: '#FFF8D2',
            background: '#0A1326',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#D44F80',
          });
        }
      });
  };

  useEffect(() => {
    getUsers();
  }, [flag]);

  const editUser = (id) => {
    alert(id);
  };

  const deleteUser = async (id) => {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar el usuario? ¡Este cambio es irreversible!',
      showDenyButton: true,
      color: '#FFF8D2',
      background: '#0A1326',
      confirmButtonColor: '#D44F80',
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cancelar',
      denyButtonColor: '#D44F80',
    }).then((result) => {
      if (result.isConfirmed) {
        clientAxios.delete(`/user/${id}`)
          .then((response) => {
            if (response.status !== 400) {
              setFlag(!flag);
              Swal.fire({
                icon: 'success',
                iconColor: '#D44F80',
                title: 'El usuario se eliminó correctamente',
                color: '#FFF8D2',
                background: '#0A1326',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#D44F80',
              });
            } else {
              Swal.fire({
                icon: 'error',
                iconColor: '#D44F80',
                title: 'Ha ocurrido un error!',
                color: '#FFF8D2',
                background: '#0A1326',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#D44F80',
              });
            }
          });
      }
    });
  };

  const handleFilterCat = (cat) => {
    if (cat === 'all') {
      setUsersAux(users);
    } else {
      const itemsMap = users.filter((user) => (user.role.toLowerCase() === cat.toLowerCase())
      && user);
      setUsersAux(itemsMap);
    }
  };

  const handleFilterInput = (e) => {
    if (e.length === 0) {
      setUsersAux(users);
    } else {
      const itemsMap = users.filter(user => ((user.userName.toLowerCase() === e.toLowerCase())
      || (user.email.toLowerCase() === e.toLowerCase())) && user);

      setUsersAux(itemsMap);
    }
  };
  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='d-flex ps-0'>
          <div className='me-2'>
            <input type="text" className={`form-control ${styles.placeholder}`} onChange={(e) => handleFilterInput(e.target.value)} aria-label="Sizing example input" placeholder='Buscar por email o usuario'/>
          </div>
          <div>
            <ul className="nav nav-pills">
              <li className="nav-item dropdown">
                <a className={`nav-link dropdown-toggle ${styles.categories}`} data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Filtrar por Roll</a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" onClick={() => handleFilterCat('Admin')} >Administrador</a></li>
                  <li><a className="dropdown-item" onClick={() => handleFilterCat('queen')}>Queen</a></li>
                  <li><a className="dropdown-item" onClick={() => handleFilterCat('client')}>Cliente</a></li>
                  <li><a className="dropdown-item" onClick={() => handleFilterCat('all')}>Todos</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
          {
          !isLoading
            ? <h1>Cargando</h1>
            : <table className={`table ${styles.table}`}>
                <thead>
                  <tr>
                    <th scope="col">Nombre de usuario</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th scope="col">Perfil</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    usersAux.map((user, i) => (
                      <tr key={i}>
                        <td>{user.userName}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button type="button" onClick={() => deleteUser(user._id)} className="btn btn-danger"><i className="bi bi-trash3"></i></button>
                          <button type="button" className="btn btn-success mx-2"><i data-bs-target="#edit" data-bs-toggle="modal" className="bi bi-pencil-square"></i></button>
                          </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            }
        <GeneralModal id='edit'>
          <h1>lorem jsdjfjsjdf sdfsdjfsd hsdjf skdfgj</h1>
        </GeneralModal>
      </div>
    </div>
  );
};

export default UserViewer;
