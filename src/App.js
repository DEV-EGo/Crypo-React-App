import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';




function App() {

  const[coins,setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
    .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )
    .then(res => {
      setCoins(res.data);
    })
    .catch(error => console.log(error));
  }, []);

  const handelChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())
    )

  return (
    <div className="coin-app">

      <div className = 'coin-search'>

        <h1 className = 'coin-text'> Search a Currency</h1>

        <form>
          <input type = 'text' placeholder = 'search'
            className= 'coin-input' onChange = {handelChange}/>
        </form>

      </div>
    {filteredCoins.map(coin => {
      return 
        <coin 
        key ={coin.id} 
        name = {coin.name} 
        image ={coin.image}
        symbol = {coin.symbol}
        voliume = {coin.market_cap}
        />;
      
    })}
    </div>

  );
}

export default App;
