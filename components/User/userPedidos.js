import React from 'react';
import compras from '../../data/purchase.json';

const UserPedidos = ({ purchase }) => {
  return (
        <>
        <h2 className='text-white'>Historial de Pedidos</h2>
            <table className={'table  text-white'}>
                <thead>
                    <tr>
                        <th scope="col">Queen</th>
                        <th scope="col">Galeria</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        purchase?.map((user, i) => (
                            <tr key={i}>
                                <td>{user.queen}</td>
                                <td>{user.galleryName}</td>
                                <td>{user.date}</td>
                                <td>${user.cost}</td>
                                {/* <td>
                                    <button type="button" className="btn btn-danger"><i className="bi bi-trash3"></i></button>
                                    <button type="button" className="btn btn-success mx-2"><i data-bs-target="#edit" data-bs-toggle="modal" className="bi bi-pencil-square"></i></button>
                                </td> */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
  );
};

export default UserPedidos;
