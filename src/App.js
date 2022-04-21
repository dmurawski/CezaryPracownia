import React , { useEffect, useState } from 'react';
import './App.css';
import { getList ,setItem } from './services/list';


function App() {
  const [list, setList] = useState([]);
  const [itemInput, setItemInput] = useState('');
  const [alert, setAlert] = useState(false);
  
  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 1000)
    }
  }, [alert])



  useEffect(() => {
    let mounted = true;
    getList()
      .then(items => {
        if (mounted) {
          setList(items)
        }
      })
    return () => mounted = false;
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setItem(itemInput)
    .then(() => {
      setItemInput('');
      setAlert(true);
    })

  };

  return (
    <div>
      <h1>Lista zakupów</h1>
      <ul>
        {list.map(item => <li key={item.item}>{item.item}</li>)}
      </ul>
      {alert && <h2> Produkt dodany do listy </h2>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Nowy przedmiot</p>
          <input type="text" onChange={event => setItemInput(event.target.value)} value={itemInput}/>
        </label>
        <button type="submit">Dodaj</button>
      </form>

    </div>
  )
}

export default App;
