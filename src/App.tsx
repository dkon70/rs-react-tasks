import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import Form1 from './components/Form1/Form1';
import Form2 from './components/Form2/Form2';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/form1" element={<Form1 />} />
      <Route path="/form2" element={<Form2 />} />
    </Routes>
  );
}

export default App;
