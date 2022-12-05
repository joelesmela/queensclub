import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './modalEditGallery.module.css';
import LoaderInit from '../Loader/LoaderInit';

import CloudinaryUploadImage from '../CloudinaryUploadImage/CloudinaryUploadImage';

const ModalEditGallery = ({ galeria }) => {
  const [threPhotos, setThrePhotos] = useState(galeria?.photosShow);
  const [photos, setPhotos] = useState(galeria?.photos);
  const [blur, setBlur] = useState(galeria?.photoBlur);
  const [cover, setCover] = useState(galeria?.coverPhotoGallery);

  const UpdateUserSchema = Yup.object().shape({
    galleryName: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    galleryName: galeria?.galleryName,
    price_USD: galeria?.price_USD,
    price: galeria?.price,
  };

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  useEffect(() => {
    if (galeria) {
      reset(defaultValues);
    }
  }, [galeria]);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleCover = (data) => {
    setCover(data);
  };
  const handleThree = (data) => {
    setThrePhotos(data);
  };
  const handleBlur = (data) => {
    setBlur(data);
  };

  const handleGaleria = (data) => {
    setPhotos(data);
  };

  if (galeria === undefined) return <LoaderInit />;
  return (
        <div className="p-5 d-flex  justify-content-center align-items-center" >
            <form onSubmit={handleSubmit(onSubmit)}>
                <section className='d-flex w-100 justify-content-center flex-wrap' >
                    <div className="mb-3 m-2">
                        <label htmlFor="nombreGaleria" className={`form-label ${styles.label_edit}`}>Nombre </label>
                        <input autoComplete='false' type="text" className="form-control" id="nombreGaleria" {...register('galleryName', { required: true })} />
                    </div>
                    <div className="mb-3 m-2">
                        <label htmlFor="precioArs" className={`form-label ${styles.label_edit}`}>Precio ARS</label>
                        <input type="number" className="form-control" id="precioArs" {...register('price', { required: true })} />
                    </div>
                    <div className="mb-3 m-2">
                        <label htmlFor="precioUsd" className={`form-label ${styles.label_edit}`}>Precio USD</label>
                        <input type="number" className="form-control" id="precioUsd" {...register('price_USD', { required: true })} />
                    </div>
                </section>

                <h4 className='text-white'>FOTOS</h4>
                <section className={`w-100 d-flex flex-wrap align-items-center justify-content-center ${styles.container_photos}`}>
                    <div className='col-md-3 m-2'>
                        <h4 className='text-white'>Portada</h4>
                        <img src={galeria?.coverPhotoGallery} alt={galeria?.galleryName} style={{ width: '100%' }} />
                    </div>
                    <div className='col-md-3 m-2 d-flex' style={{ border: '1px solid #fff', maxHeight: '50px' }}>
                    <CloudinaryUploadImage onSave={handleCover} label='+ Editar' />
                </div>

                </section>

                <section className={`w-100 d-flex flex-wrap  align-items-center justify-content-center ${styles.container_photos}`}>
                    <div className='col-md-3 m-2'>
                        <h4 className='text-white'>Foto Blur</h4>
                        <img src={galeria?.photoBlur} style={{ width: '100%' }} />
                    </div>
                    <div className='col-md-3 m-2 d-flex ' style={{ border: '1px solid #fff', maxHeight: '50px' }}>
                    <CloudinaryUploadImage onSave={handleBlur} label='+ Editar' />
                    </div>

                </section>

                <h4 className='text-white'>FOTOS SIN CENSURA</h4>
                <section className={`w-100 d-flex flex-wrap align-items-center justify-content-center ${styles.container_photos}`}>

                    {galeria.photosShow.map((res, i) => {
                      return (
                            <div className='col-md-3 m-2 d-flex' key={i}>
                                <img src={res} style={{ width: '100%' }} />
                            </div>
                      );
                    })}

                    <div className='col-md-3 m-2 d-flex' style={{ border: '1px solid #fff', maxHeight: '50px' }}>
                        <CloudinaryUploadImage onSave={handleThree} label='+ Agregar' />
                    </div>

                </section>
                {/* <CloudinaryUploadImage onSave={handleCover} label='+' />
                 <CloudinaryUploadImage onSave={handleThree} label='+' />
                 <CloudinaryUploadImage onSave={handleBlur} label='+' /> */}

                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
  );
};

export default ModalEditGallery;
