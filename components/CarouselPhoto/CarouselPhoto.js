/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CloudinaryUploadImage from '../CloudinaryUploadImage/CloudinaryUploadImage';
import styles from '../../styles/Forms.module.css';
import clientAxios from '../../config/clientAxios';

const CarouselPhoto = () => {
  const [queen, setQueen] = useState([]);
  const [coverImage, setCoverImage] = useState('');

  const {
    register, handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    await clientAxios.post('/queen', data);
  };

  const handleQueen = async () => {
    const response = await clientAxios.get('/queen');
    setQueen(response.data);
  };

  const handleCoverImage = (arrayImages) => {
    setCoverImage(arrayImages);
  };

  useEffect(() => {
    handleQueen();
  }, []);

  return (
    <form className="col-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 pt-5">
        <h2 style={{ color: '#D44F80' }}>CREAR CARRUSEL</h2>
        <label className={`form-label ${styles.title}`}>Nombre de Queen</label>
        <select className={`form-select ${styles.placeholder}`} {...register('idQueen', { required: true })}>
          <option selected>Seleccione una Queen</option>
          {
            queen.length > 0 && queen.map(x => <option key={x._id} value={x._id}>{x.name}</option>)
          }
        </select>
      </div>
      <div className="mb-3">
        <CloudinaryUploadImage onSave={handleCoverImage} label="Cargar foto de Carousel para escritorio" />
      </div>
      <div className="mb-3">
        <CloudinaryUploadImage onSave={handleCoverImage} label="Cargar foto de Carousel para celular" />
      </div>
      <button type="submit" className="btn btn-primary">Crear Foto de Carousel</button>
    </form>
  );
};

export default CarouselPhoto;
