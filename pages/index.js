import { useEffect, useState } from 'react';
import Head from 'next/head';
import Carousel from '../components/Carousel/Carousel';
import Footer from '../components/Footer/Footer';
import Tab from '../components/Tab/Tab';
import styles from '../styles/Home.module.css';
import InfoSection from '../components/InfoSection/InfoSection';
import ModalSingIn from '../components/ModalSingIn/ModalSingIn';
import InfoSubs from '../components/InfoSubs/InfoSubs';
import clientAxios from '../config/clientAxios';
import { useShuffle } from '../context/shuffleContext';

const Home = ({ galleries, queens }) => {
  const [banners, setBanners] = useState([]);
  const { shuffleArray } = useShuffle();
  const random = () => {
    const len = queens.length;
    return Math.floor(Math.random() * len);
  };

  useEffect(() => {
    if (queens.length === 0) return;
    setBanners([...banners, queens[random()]]);
  }, [queens]);
  shuffleArray(queens);
  shuffleArray(galleries);

  return (
    <div className={styles.bgHome}>
      <Head>
        <title>My Queens Club - Enjoy The Club</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <ModalSingIn idModal='singIn' />
        <Carousel carouselInfo={banners} />
      </header>

      <main className='mb-5'>
        <InfoSubs className='my-5' />
        <Tab galleries={galleries} queens={queens} />
        <InfoSection className="my-5" />
      </main>

      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const gal = await clientAxios('galleries');
  const dataG = gal.data;
  const que = await clientAxios('queen');
  const dataQ = que.data;
  return {
    props: { galleries: dataG, queens: dataQ },
  };
}
export default Home;
