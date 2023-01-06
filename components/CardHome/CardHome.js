import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from './cardhome.module.css';

const CardHome = ({
  coverImage, name,
}) => {
  const token = localStorage.getItem('accessToken') || undefined;
  const role = token === undefined ? 'client' : jwtDecode(token).role;
  const { push } = useRouter();

  const editQueen = (idQueen) => {
    push(`editQueen/${idQueen}`);
  };
  return (
    <div className='m-2 col-md-12 position-relative'>
       {
        role === 'admin'
      && <button className={`btn btn-primary ${styles.btnEdit}`} onClick={() => editQueen(name)}>
      <i className="bi bi-pencil-square"></i>
      </button>
       }

      <img src={coverImage} alt={name} className={styles.cardHome} />
      <div className='text-center h-100 w-100 d-flex justify-content-center align-items-center'>
        <div className={` rounded text-white ${styles.cardInfo}`}>
          <h5 className={` px-3 py-1 ${styles.titleName}`}>{name}</h5>
          <Link href={`/galleries/${name}`} passHref>
            <button type="button" className={`btn btn-outline-light m-1 ${styles.buttonStyle}`} >Ver Galerias</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

CardHome.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default CardHome;
