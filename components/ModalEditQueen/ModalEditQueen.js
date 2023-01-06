import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import style from './modalEditQueen.module.css';
import LoaderInit from '../Loader/LoaderInit';
import CloudinaryUploadImage from '../CloudinaryUploadImage/CloudinaryUploadImage';
import clientAxios from '../../config/clientAxios';

const ModalEditQueen = ({ queen }) => {
  const [banner, setBanner] = useState('');
  const [cover, setCover] = useState('');
  const [Loading, setLoading] = useState(false);
  const { push } = useRouter();

  const onSubmit = async () => {
    setLoading(true);
    const dataFinish = {
      name: queen.name,
      coverImage: cover,
      photoCarrusel: banner,
    };
    await clientAxios.post(`queen/${queen._id}`, dataFinish);
    setLoading(false);
    Swal.fire('Queen editada con exito!!');
    push('/queens');
  };

  useEffect(() => {
    if (queen) {
      setCover(queen.coverImage);
      setBanner(queen.photoCarrusel);
    }
  }, [queen]);
  const handleCover = (data) => {
    setCover(data[0]);
  };

  const handleBanner = (data) => {
    setBanner(data[0]);
  };

  if (queen === undefined) return <LoaderInit />;
  return (
    <>
        <div container className="p-5  d-flex  flex-column flex-wrap align-items-center justify-content-center" >
          <div className='text-white col-12 col-md-6 p-2 d-flex flex-column  align-items-center justify-content-center'>
            <h4>
              IMAGEN DE PORTADA
            </h4>
            <img src={cover} className={style.img}></img>
            <CloudinaryUploadImage multiple={false} onSave={handleCover} label='EDITAR'/>
          </div>
          <div className=' text-white col-12 col-md-6 p-2 d-flex flex-column  align-items-center justify-content-center'>
             <h4>
              IMAGEN  BANNER
            </h4>
            <img src={banner} className={style.img}></img>
            <CloudinaryUploadImage multiple={false} onSave={handleBanner} label='EDITAR'/>
          </div>
        </div>
        <div className='w-100 d-flex align-items-center justify-content-center'>
          {
            Loading
              ? <button disabled className={`btn btn-primary ${style.btnLoading}`}>
             <div className="spinner-border" role="status">
             </div>
             </button>
              : <button onClick={onSubmit} className={`btn btn-primary ${style.btnSave}`}>
             GUARDAR CAMBIOS
             </button>
          }
        </div>
    </>

  );
};

export default ModalEditQueen;
