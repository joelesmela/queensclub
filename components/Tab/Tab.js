import { useState } from 'react';
import PropTypes from 'prop-types';
import CardCarousel from '../CardCarousel/CardCarousel';
import styles from './tab.module.css';

const Tab = ({ galleries, queens }) => {
  const [activeTab, setActiveTab] = useState(2);

  const className = undefined;
  const long = galleries.length / 2;
  const galleries1 = [];
  const galleries2 = [];
  const queens1 = [];
  const queens2 = [];

  galleries?.forEach((res, idx) => {
    if (idx < long) { galleries1.push(res); } else { galleries2.push(res); }
  });

  queens?.forEach((res, idx) => {
    if (idx < long) { queens1.push(res); } else { queens2.push(res); }
  });

  return (
    <>
      <ul className={`row gx-0 nav mb-3 ${styles['nav-pills']} ${className}`} id="pills-tab" role="tablist">
        <div className="col-12 col-md-4 p-1">
          <li className={`nav-item ${styles.bgTab}`} role="presentation" style={{ backgroundImage: 'url("https://cdnmansite.metartnetwork.com/static/media/photography.493d088d5e7196be7f4a.jpg")' }}>
            <button className={`text-uppercase w-100 py-5 ${activeTab === 1 && styles.active} ${styles['tab-nav-link']}`} id="pills-galerias-tab" data-bs-toggle="pill" data-bs-target="#pills-galerias" type="button" role="tab" aria-controls="pills-galerias" aria-selected="true" onClick={() => setActiveTab(1)}>
              <p className={`fs-5 m-0 ${styles.text}`}>Galerías</p>
              <div className='d-flex justify-content-center'>
                <i className={`bi bi-caret-down-fill position-absolute ${styles.icon} ${activeTab !== 1 && styles.iconColor}`} />
              </div>
            </button>
          </li>
        </div>

        <div className="col-12 col-md-4 p-1">
          <li className={`nav-item ${styles.bgTab}`} role="presentation" style={{ backgroundImage: 'url("https://cdnmansite.metartnetwork.com/static/media/models.3dc42abec49fead08f1b.jpg")' }}>
            <button className={`text-uppercase w-100 py-5 ${activeTab === 2 && styles.active} ${styles['tab-nav-link']}`} id="pills-queens-tab" data-bs-toggle="pill" data-bs-target="#pills-queens" type="button" role="tab" aria-controls="pills-queens" aria-selected="false" onClick={() => setActiveTab(2)}>
              <p className={`fs-5 m-0 ${styles.text}`}>Queens</p>
              <div className='d-flex justify-content-center'>
                <i className={`bi bi-caret-down-fill position-absolute ${styles.icon} ${activeTab !== 2 && styles.iconColor}`} />
              </div>
            </button>
          </li>
        </div>

        <div className="col-12 col-md-4 p-1">
          <li className={`nav-item ${styles.bgTab}`} role="presentation" style={{ backgroundImage: 'url("https://cdnmansite.metartnetwork.com/static/media/films.964724b67d6caf99ba28.jpg")' }}>
            <button className={`text-uppercase w-100 py-5 ${activeTab === 3 && styles.active} ${styles['tab-nav-link']}`} id="pills-films-tab" data-bs-toggle="pill" data-bs-target="#pills-films" type="button" role="tab" aria-controls="pills-films" aria-selected="false" onClick={() => setActiveTab(3)}>
              <p className={`fs-5 m-0 ${styles.text}`}>Vídeos</p>
              <div className='d-flex justify-content-center'>
                <i className={`bi bi-caret-down-fill position-absolute ${styles.icon} ${activeTab !== 3 && styles.iconColor}`} />
              </div>
            </button>
          </li>
        </div>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade" id="pills-galerias" role="tabpanel" aria-labelledby="pills-galerias-tab">
          <CardCarousel carouselInfo={galleries1} gallery={5} />
          <CardCarousel carouselInfo={galleries2} gallery={5} />
        </div>

        <div className="tab-pane fade show active" id="pills-queens" role="tabpanel" aria-labelledby="pills-queens-tab">
          <CardCarousel carouselInfo={queens1} queen={5} />
          <CardCarousel carouselInfo={queens2} queen={5} />
        </div>

        <div className="tab-pane fade" id="pills-films" role="tabpanel"
          aria-labelledby="pills-films-tab">
          <div className='vh-100 d-flex justify-content-center align-items-center'>
            <h3 className='text-white'>Proximamente...</h3>
          </div>
        </div>
      </div>
    </>
  );
};

Tab.propTypes = {
  className: PropTypes.string,
};

export default Tab;
