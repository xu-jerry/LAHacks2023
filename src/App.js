import { React } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Example, Games,
  Timer, Resources, Home,
} from './pages';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <div>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={(<Home />)} />
            <Route path="/example" element={(<Example />)} />
            <Route path="/games" element={(<Games />)} />
            <Route path="/timer" element={(<Timer />)} />
            <Route path="/resources" element={(<Resources />)} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
