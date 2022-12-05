import classesText from '../../styles/Galleries.module.css';

function AlertSecurity() {
  return (
        <div className={` m-auto ${classesText.bgHome} p-1`}>
            <h3 className={`text-center mt-2 ${classesText.title}`} > ¡ALERTAS DE SEGURIDAD!</h3>
            <p className={`p-2 text-center ${classesText.title}`}>Evita sanciones y bloqueos permanentes de tu cuenta, My Queens Club cuenta con
                        herramientas para localizar los intentos de extracción de contenido.</p>
        </div>
  );
}

export default AlertSecurity;
