import { useState, useEffect } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import { ArrowUpDown, RefreshCw, TrendingUp } from 'lucide-react'

function App() {
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmt, setConvertedAmt] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [conversionHistory, setConversionHistory] = useState([])
  const [theme, setTheme] = useState('light')

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmt(amount)
    setAmount(convertedAmt)
  }

  const convert = () => {
    setIsLoading(true)
    setTimeout(() => {
      const convertedValue = amount * currencyInfo[to]
      setConvertedAmt(convertedValue)
      
      // Save to history
      const newEntry = {
        from,
        to,
        amount,
        result: convertedValue,
        timestamp: new Date().toLocaleTimeString()
      }
      setConversionHistory(prev => [newEntry, ...prev].slice(0, 5))
      setIsLoading(false)
    }, 600) // Simulate API delay
  }

  useEffect(() => {
    if (Object.keys(currencyInfo).length > 0) {
      convert()
    }
  }, [from, to, currencyInfo])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // Modern financial backgrounds with gradients
  const backgroundLight = 'linear-gradient(135deg, rgba(0,123,255,0.1) 0%, rgba(0,123,255,0.02) 100%), url("https://images.pexels.com/photos/15522683/pexels-photo-15522683/free-photo-of-banknotes-and-coins-on-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'
  
  const backgroundDark = 'linear-gradient(135deg, rgba(25,25,112,0.9) 0%, rgba(10,10,50,0.95) 100%), url("https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80")'

  return (
    <div className="relative w-full min-h-screen">
      {/* Background with parallax effect */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{ 
          backgroundImage: theme === 'light' ? backgroundLight : backgroundDark,
          backgroundAttachment: 'fixed',
          zIndex: -1
        }}
      />
      
      {/* Optional floating elements for visual appeal */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute w-64 h-64 rounded-full bg-blue-500/10 blur-3xl top-20 -left-20 animate-pulse`} style={{ animationDuration: '8s' }}></div>
        <div className={`absolute w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl bottom-40 -right-20 animate-pulse`} style={{ animationDuration: '12s' }}></div>
        <div className={`absolute w-72 h-72 rounded-full bg-purple-500/10 blur-3xl top-1/2 left-1/3 animate-pulse`} style={{ animationDuration: '10s' }}></div>
      </div>
      
      {/* Main content */}
      <div className={`relative w-full min-h-screen flex flex-wrap justify-center items-center transition-all duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        <div className="absolute top-4 right-4">
          <button 
            onClick={toggleTheme}
            className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all shadow-lg"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
        
        <div className="w-full max-w-4xl px-4">
          <h1 className="text-4xl font-bold text-center mb-2 text-white drop-shadow-lg">Currency Converter Pro</h1>
          <p className="text-center text-white/80 mb-8">Fast and accurate currency conversion with real-time exchange rates</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Converter Card */}
            <div className="lg:col-span-2 border border-white/20 rounded-xl p-6 backdrop-blur-md bg-white/10 shadow-xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  convert();
                }}
              >
                <div className="w-full mb-4">
                  <InputBox
                    label="From"
                    amount={amount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setFrom(currency)}
                    selectCurrency={from}
                    onAmountChange={(amount) => setAmount(amount)}
                    theme={theme}
                  />
                </div>
                <div className="relative w-full h-0.5 my-6">
                  <button
                    type="button"
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white/50 rounded-full bg-blue-600 hover:bg-blue-700 text-white p-3 transition-all duration-300 shadow-lg"
                    onClick={swap}
                  >
                    <ArrowUpDown size={18} />
                  </button>
                </div>
                <div className="w-full mt-4 mb-6">
                  <InputBox
                    label="To"
                    amount={isLoading ? '...' : convertedAmt}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setTo(currency)}
                    selectCurrency={to}
                    amountDisable
                    theme={theme}
                  />
                </div>
                <button 
                  type="submit" 
                  className={`w-full flex items-center justify-center gap-2 text-white px-6 py-4 rounded-lg text-lg font-medium transition-all duration-300 ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} shadow-lg hover:shadow-blue-500/20`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="animate-spin" size={20} /> Converting...
                    </>
                  ) : (
                    <>
                      Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </>
                  )}
                </button>
              </form>
              
              {/* Live exchange rate */}
              <div className="mt-4 p-3 bg-white/10 rounded-lg text-center backdrop-blur-sm">
                <p className="flex items-center justify-center gap-2">
                  <TrendingUp size={16} className="text-green-400" />
                  <span>
                    1 {from.toUpperCase()} = {currencyInfo[to] ? currencyInfo[to].toFixed(4) : '...'} {to.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
            
            {/* History Card */}
            <div className="border border-white/20 rounded-xl p-6 backdrop-blur-md bg-white/10 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-white">Conversion History</h2>
              {conversionHistory.length > 0 ? (
                <div className="space-y-3">
                  {conversionHistory.map((entry, index) => (
                    <div key={index} className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="flex justify-between text-sm">
                        <span>{entry.amount} {entry.from.toUpperCase()}</span>
                        <span>→</span>
                        <span>{entry.result.toFixed(2)} {entry.to.toUpperCase()}</span>
                      </div>
                      <div className="text-xs text-white/60 mt-1">{entry.timestamp}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-center py-8">No conversions yet</p>
              )}
            </div>
          </div>
          
          {/* Features section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-5 backdrop-blur-sm bg-white/10 rounded-lg border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-medium text-lg text-white mb-2">Real-Time Data</h3>
              <p className="text-white/70">Latest exchange rates from global financial markets</p>
            </div>
            <div className="p-5 backdrop-blur-sm bg-white/10 rounded-lg border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-medium text-lg text-white mb-2">170+ Currencies</h3>
              <p className="text-white/70">Convert between major and exotic currencies worldwide</p>
            </div>
            <div className="p-5 backdrop-blur-sm bg-white/10 rounded-lg border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-medium text-lg text-white mb-2">Smart History</h3>
              <p className="text-white/70">Track your recent conversions with time stamps</p>
            </div>
          </div>
          
          <footer className="text-center text-white/50 py-6 mt-12">
            <p>© {new Date().getFullYear()} Currency Converter Pro</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
