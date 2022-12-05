import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';
import classesText from '../../styles/Galleries.module.css';
import styles from './Msginitial.module.css';
import { useUser } from '../../context/userContext';

function Msginitial() {
  const { acept, setAcept } = useUser();
  const router = useRouter();
  const handleExit = () => {
    router.push('https://www.google.com/');
  };
  const handleAcept = () => {
    setAcept(false);
  };
  const handlePolitic = () => {
    router.push('/politics');
    setAcept(false);
  };
  const handleTerms = () => {
    router.push('/terms');
    setAcept(false);
  };

  return (
        <Modal size="lg" show={acept} >
            <Modal.Header className={`${classesText.bgHome}`} >
                <Modal.Title className={` ${classesText.title}`}>¡BIENVENIDX A MY QUEENS CLUB!</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`${classesText.bgHome}`}>
                <p className={` ${classesText.title}`}>Nuestro sitio web contiene contenido para adultos y debes ser mayor de edad, respetando
                    todas las normas que presentamos en nuestros <button className={`${styles.button} ${classesText.bgHome}`} onClick={handleTerms}><span className={styles.text}>términos y condiciones</span></button></p>
                <p className={` ${classesText.title}`}>También, nuestro sitio web cuenta con sistemas de seguridad que debes aceptar y respetar
                    para evitar todo tipo de sanciones como se indican en nuestra <button className={`${styles.button} ${classesText.bgHome}`} onClick={handlePolitic}><span className={styles.text}>política de privacidad.</span></button></p>
                <p className={` ${classesText.title}`}>Al &quot;Aceptar&quot; e ingresar en nuestro sitio web, estás aceptando todo lo anterior y certificando
                    que sos mayor de edad.</p>
                <p className={` ${classesText.title}`} >¡Gracias por elegir ser parte del Club!</p>
            </Modal.Body>
            <Modal.Footer className={`${classesText.bgHome}`}>
                <Button variant="secondary" onClick={handleExit} >Rechazar</Button>
                <button onClick={handleAcept} className={`btn ${classesText.button}`} ><span>Soy mayor de 18 años y acepto todas las condiciones</span></button>
            </Modal.Footer>
    </Modal>
  );
}

export default Msginitial;
