import './App.css'
import Header from './components/Header/Header'
import CurrencyInput from './components/CurrencyInput/CurrencyInput'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [amount1, setAmount1] = useState(1)
  const [amount2, setAmount2] = useState(1)
  const [currency1, setCurrency1] = useState('USD')
  const [currency2, setCurrency2] = useState('USD')
  const [symbols, setSymbols] = useState([])
  const [rates, setRates] = useState([])
  const [amountUSD, setAmountUSD] = useState(36)
  const [amountEUR, setAmountEUR] = useState(37)
  const apikey = 'Kk0B4oUyjYf9GxaHjrEqnRIbG0DIl2GD'
  const currentAPI = 'exchangerates_data' // I had to add this because there is a problem with API. It has 250 times limit for requests.

  useEffect(() => {
    axios.get(`https://api.apilayer.com/${currentAPI}/symbols?apikey=${apikey}`)
      .then(response => {
        setSymbols(response.data.symbols)
      })

    axios.get(`https://api.apilayer.com/${currentAPI}/latest?symbols=${Object.keys(symbols)}&base=EUR&apikey=${apikey}`)
      .then(response => {
        setRates(response.data.rates)
        setAmountUSD(format(1 * response.data.rates['UAH'] / response.data.rates['USD']))
        setAmountEUR(format(1 * response.data.rates['UAH'] / response.data.rates['EUR']))
      })
  }, [])

  useEffect(() => {
    if (!!rates) {
      handleAmount1Change(1)
    }
  }, [rates])

  function format(number) {
    return number.toFixed(4)
  }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]))
    setAmount1(amount1)
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]))
    setCurrency1(currency1)
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]))
    setAmount2(amount2)
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]))
    setCurrency2(currency2)
  }

  return (
    <div>
      <Header amountUSD={amountUSD} amountEUR={amountEUR} />
      <main>
        <h1>Currency Converter</h1>
        <CurrencyInput
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
          currencies={Object.keys(symbols)}
          // currencies={['USD', 'EUR', 'UAH','USD', 'EUR', 'UAH','USD', 'EUR', 'UAH','USD', 'EUR', 'UAH','USD', 'EUR', 'UAH']}
          amount={amount1}
          currency={currency1} />
        <CurrencyInput
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrency2Change}
          currencies={Object.keys(symbols)}
          amount={amount2}
          currency={currency2} />
      </main>
    </div>
  );
}

export default App
