import Head from 'next/head';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import NewQueen from '../../components/NewQueen/NewQueen';
import NewGallery from '../../components/NewGallery/NewGallery';
import ModalSingIn from '../../components/ModalSingIn/ModalSingIn';
import styles from '../../styles/Home.module.css';
import UserViewer from '../../components/UsersViewer/UserViewer';
import Error from '../../components/Error';

const Admin = () => {
  const [queen, setQueen] = useState(false);

  const jwt = localStorage.getItem('accessToken');
  const role = jwt ? jwtDecode(jwt).role : undefined;

  /* if (role !== 'admin') {
    useRouter().push('/')
  } */

  return (
    <>
      {
        role === 'admin'
          ? <div>
            <Head>
              <title>My Queens Club - Enjoy The Club</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
              <ModalSingIn idModal='singIn' />
            </header>

            <main className={`p-md-5 ${styles.bgHome} d-flex justify-content-center align-items-center flex-wrap`}>
              <NewQueen setQueen={setQueen} />
              <NewGallery queenSelect={queen} />
              <UserViewer />
            </main>

          </div>
          : <Error texto={'Lo sentimos no estas autorizado a ingresar a esta seccion'} number={'401'}></Error>
      }
    </>
  );
};
export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await res.json();

  return {
    props: { data },
  };
}
export default Admin;
