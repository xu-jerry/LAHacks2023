import { React } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Home,
  Transcribble,
  Timer,
  Writing,
  Games,
  Resources,
  Sudoku,
  Anagrams,
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
            <Route path="/transcribble" element={(<Transcribble />)} />
            <Route path="/games" element={(<Games />)} />
            <Route path="/timer" element={(<Timer />)} />
            <Route path="/chat" element={(<Writing />)} />
            <Route path="/resources" element={(<Resources />)} />
            <Route path="/games/sudoku" element={(<Sudoku />)} />
            <Route path="/games/anagrams" element={(<Anagrams />)} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
