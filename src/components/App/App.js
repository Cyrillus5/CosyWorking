import {
  Route,
  Routes,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';
import EspacePerso from '../EspacePerso/EspacePerso';
import './App.scss';
import ModalAlertConnection from '../ModalAlertConnection/ModalAlertConnection';
import EspaceCoworker from '../EspacePerso/EspaceCoworker/EspaceCoworker';

function App() {
  // On vérifie si le token n'a pas expiré en récupérant l'état de connexion
  const errorConnection = useSelector((state) => state.user.error_connection);

  return (
    <div className="App">
      <Nav />
      <EspaceCoworker />
      {/* Si le token a expiré, on récupère une erreur et donc on incite l'user à se reconnecter */}
      {errorConnection && <ModalAlertConnection />}
      <Routes>
        <Route path="/espace-perso" element={<EspacePerso />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
