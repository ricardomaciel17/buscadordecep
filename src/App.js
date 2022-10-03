import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './services/api';
function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("favor preencher o cep")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");
    } catch {
      alert("erro ao buscar o cep")
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador Cep </h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep:"
          value={input}
          onChange={(e) => setInput(e.target.value)} />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>


      {Object.keys(cep).length > 1 && (
        <main className='main'>
          <h2>Cep: {cep.cep}</h2>

          <span>Rua: {cep.logradouro}</span>
          <span>complemento: {cep.complemento}</span>
          <span>bairro: {cep.bairro}</span>
          <span>Localidade: {cep.localidade} - {cep.uf}</span>
        </main>
      )}


    </div>
  );
}

export default App;
