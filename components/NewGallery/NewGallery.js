/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import clientAxios from '../../config/clientAxios';
import styles from '../../styles/Forms.module.css';
import CloudinaryUploadImage from '../CloudinaryUploadImage/CloudinaryUploadImage';

const NewGallery = ({ queenSelect }) => {
  const [queen, setQueen] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [coverPhotoGallery, setCoverPhotoGallery] = useState('');
  const [three, setThree] = useState([]);
  const [censoriship, setCensoriship] = useState('');
  const [loading, setLoading] = useState(false);

  const schema = Yup.object({
    idQueen: Yup.string().required('Tienes que seleccionar una Queen'),
    galleryName: Yup.string().required('El nombre de la galeria es requerido'),
    price: Yup.string()
      .min(2, 'El precio debe tener como minimo 2 cifras')
      .required('El precio es requerido'),
    price_USD: Yup.string()
      .min(2, 'El precio debe tener como minimo 2 cifras')
      .required('El precio en dolares es requerido'),
  }).required();

  const {
    register, handleSubmit, formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const dataFinished = {
      ...data,
      coverPhotoGallery: coverPhotoGallery[0],
      photoBlur: censoriship[0],
      photosShow: three,
      photos: gallery,
    };
    clientAxios.post('galleries', dataFinished)
      .then(response => {
        Swal.fire('Galeria creada con exito');
        setCoverPhotoGallery('');
        setThree([]);
        setGallery([]);
        setCensoriship('');
        setLoading(false);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleQueen = async () => {
    clientAxios.get('/queen')
      .then(response => setQueen(response.data));
  };

  const handleGalleryImages = (arrayImages) => {
    setGallery(arrayImages);
  };

  const handleCoverPhotoGallery = (arrayImages) => {
    setCoverPhotoGallery(arrayImages);
  };

  const handleDeleteCover = (img) => {
    setCoverPhotoGallery(coverPhotoGallery.filter(res => res !== img));
  };

  const handleDeleteThree = (img) => {
    setThree(three.filter(res => res !== img));
  };

  const handleThreeImages = (img) => {
    if (three === 3) return;
    setThree(img);
  };
  const handleCensorshipImage = (img) => {
    setCensoriship(img);
  };

  useEffect(() => {
    handleQueen();
  }, [queenSelect]);

  return (
    <form className="col-8" onSubmit={handleSubmit(onSubmit)}>

      <div className="mb-3 pt-5">
        <h2 style={{ color: '#D44F80' }}>CREAR GALERIA</h2>
        <label htmlFor="exampleInputEmail1" className={`form-label ${styles.title}`}>Nombre de Queen</label>
        <select className={`form-select ${styles.placeholder}`} aria-label="Default select example" {...register('idQueen', { required: true })}>
          <option selected>Seleccione una Queen</option>
          {
            queen.length > 0 && queen.map(x => <option key={x._id} value={x.name}>{x.name}</option>)
          }
        </select>
        {errors.idQueen && <span className={'text-danger'}>{errors.idQueen.message}</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className={`form-label ${styles.title}`}>Nombre de la Galería</label>
        <input type="text" className={`form-control ${styles.placeholder}`} id="exampleInputEmail1" aria-describedby="emailHelp" {...register('galleryName', { required: true })} />
        {errors.galleryName && <span className={'text-danger'}>{errors.galleryName.message}</span>}
      </div>
      <div className="mb-3">
        <div>
          <label htmlFor="galeria" className={`form-label ${styles.title}`}>Foto de portada</label>
        </div>
        <CloudinaryUploadImage onSave={handleCoverPhotoGallery} label="Cargar foto portada" />
        <div className='d-flex flex-wrap '>
          {coverPhotoGallery && coverPhotoGallery?.map((or) => {
            return (
              <>
                <div className='position-relative'>
                  <img className={styles.image} key={or} src={or} alt={or} />
                  {/* <div className={`position-absolute ${styles.btnDelete}`} onClick={() => handleDeleteCover(or)}> x </div> */}
                </div>
              </>
            );
          })
          }
        </div>
      </div>
      <div className='d-flex col-12 justify-content-between flex-wrap'>
        <div className="mb-3 col-md-5 col-sm-12">
          <label htmlFor="exampleInputEmail1" className={`form-label ${styles.title}`}>Precio de la Galeria en ARS</label>
          <input type="number" className={`form-control ${styles.placeholder}`} id="exampleInputEmail1" aria-describedby="emailHelp" {...register('price', { required: true })} />
          {errors.price && <span className={'$text-danger'}>{errors.price.message}</span>}
        </div>
        <div className="mb-3 col-md-5 col-sm-12">
          <label htmlFor="exampleInputEmail1" className={`form-label ${styles.title}`}>Precio de la Galeria en USD</label>
          <input type="number" className={`form-control ${styles.placeholder}`} id="exampleInputEmail1" aria-describedby="emailHelp" {...register('price_USD', { required: true })} />
          {errors.price_USD && <span className={'$text-danger'}>{errors.price_USD.message}</span>}
        </div>
      </div>
      <div className="mb-3">
        <div>
          <label htmlFor="galeria" className={`form-label ${styles.title}`}>Galería de Fotos</label>
        </div>
        <div className="mb-3">
          <CloudinaryUploadImage onSave={handleThreeImages} label="Cargar 3 Fotos sin censura" />
          <div className='d-flex flex-wrap '>
            {three.length > 0 && three?.map((or) => {
              return (
                <>
                  <div className='position-relative'>
                    <img className={styles.image} key={or} src={or} alt={or} />
                    {/* <div className={`position-absolute ${styles.btnDelete}`} onClick={() => handleDeleteThree(or)}> x </div> */}
                  </div>
                </>
              );
            })
            }
          </div>
        </div>
        <div className="mb-3">
          <CloudinaryUploadImage onSave={handleCensorshipImage} label="Cargar Foto Censurada" />
          <div className='d-flex flex-wrap '>

            <div className='position-relative'>
              {
                censoriship && censoriship.map((res, i) => {
                  return (
                    <img className={styles.image} src={res} alt={'imagen blureada'} key={i}/>
                  );
                })
              }
              {/* <div className={`position-absolute ${styles.btnDelete}`} onClick={() => handleDeleteThree(or)}> x </div> */}
            </div>

          </div>
        </div>
        <div className="mb-3">
          <CloudinaryUploadImage onSave={handleGalleryImages} label="Cargar fotos de Galeria" />

          <div className='d-flex flex-wrap '>
            {gallery.length > 0 && gallery?.map((or) => {
              return (
                <>
                  <div className='position-relative'>
                    <img className={styles.image} key={or} src={or} alt={or} />
                    {/* <div className={`position-absolute ${styles.btnDelete}`} onClick={() => handleDeleteThree(or)}> x </div> */}
                  </div>
                </>
              );
            })
            }
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={!(three.length > 0 && coverPhotoGallery && censoriship && gallery.length > 0)}
        className="btn btn-primary"
      > {loading ? 'Creando galeria...' : 'Crear galería'} </button>
    </form>
  );
};

NewGallery.propTypes = {
  queenSelect: PropTypes.bool.isRequired,
};

export default NewGallery;
