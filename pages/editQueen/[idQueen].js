import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ModalSingIn from '../../components/ModalSingIn/ModalSingIn';
import Footer from '../../components/Footer/Footer';
import styles from '../../styles/Galleries.module.css';
import clientAxios from '../../config/clientAxios';
import ModalEditQueen from '../../components/ModalEditQueen/ModalEditQueen';

const EditQueen = () => {
  const { query } = useRouter();
  const { idQueen } = query;
  const [queen, setQueen] = useState();

  useEffect(() => {
    clientAxios.get('queen')
      .then(res => setQueen(res?.data?.find((q) => q.name === idQueen)));
  }, []);

  return (
    <div className={styles.bgHome}>
      <Head>
        <title>My Queens Club - Enjoy The Club</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <ModalSingIn idModal='singIn' />
        <h5 className={`text-uppercase fw-bolder text-center py-5 ${styles.title}`}>EDIT QUEEN</h5>
      </header>
      <main>
      <ModalEditQueen queen={queen}/>

      </main>
      <Footer />
    </div>
  );
};

export default EditQueen;
