/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Script from 'next/script';
import PropTypes from 'prop-types';
import styles from '../../styles/Forms.module.css';

const CloudinaryUploadImage = ({ onSave, label }) => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState('');

  const createMyWidget = () => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'lager-devs',
        uploadPreset: 'sq9ll37y',
        sources: [
          'local',
          'url',
        ],
        cropping: false,
        multiple: true,
        defaultSource: 'local',
        styles: {
          palette: {
            window: '#050914',
            sourceBg: '#050914',
            windowBorder: '#D44F80',
            tabIcon: '#D44F80',
            inactiveTabIcon: '#FFF8D2',
            menuIcons: '#FF0000',
            link: '#D44F80',
            action: '#D44F80',
            inProgress: '#FFF8D2',
            complete: '#33ff00',
            error: '#EA2727',
            textDark: '#050914',
            textLight: '#FFF8D2',
          },
        },
      },
      (error, result) => {
        setImage(result.info.url);
      },
    );

    return myWidget;
  };

  const handleClick = async () => {
    const data = await createMyWidget();
    data.open();
  };

  useEffect(() => {
    if (image) {
      setImages([
        ...images,
        image,
      ]);
    }
  }, [image]);

  useEffect(() => {
    onSave(images);
  }, [images]);

  /*   useEffect(()=>{
     setImages([])
  ,[send]})
 */
  return (
    <>
      <Script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript" />

      <button style={{ width: '100%' }} type='button' onClick={handleClick} className={`btn ${styles.button}`}>{label}</button>
    </>
  );
};

CloudinaryUploadImage.propTypes = {
  onSave: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default CloudinaryUploadImage;
