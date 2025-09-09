import { useState, useEffect, lazy, Suspense } from 'react'
import axios from 'axios'
import { 
  Activity, Users, Calendar, TrendingUp, TrendingDown,
  Heart, Shield, AlertCircle, FileText
} from 'lucide-react'

// Lazy load chart components
const ChartsSection = lazy(() => import('./components/ChartsSection'))
const CountryTable = lazy(() => import('./components/CountryTable'))

function App() {
  const [covidData, setCovidData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCovidData()
  }, [])

  const fetchCovidData = async () => {
    try {
      // Using disease.sh API for COVID-19 data
      const [global, countries, historical] = await Promise.all([
        axios.get('https://disease.sh/v3/covid-19/all'),
        axios.get('https://disease.sh/v3/covid-19/countries?sort=cases'),
        axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
      ])

      setCovidData({
        global: global.data,
        topCountries: countries.data.slice(0, 10),
        historical: historical.data
      })
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch data. Please try again later.')
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading healthcare data...</div>
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error">{error}</div>
      </div>
    )
  }

  // Calculate percentage changes
  const calculateChange = (current, previous) => {
    const change = ((current - previous) / previous * 100).toFixed(1)
    return change > 0 ? `+${change}%` : `${change}%`
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Healthcare Analytics Dashboard</h1>
        <p className="dashboard-subtitle">Real-time COVID-19 Global Statistics</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <h3 className="stat-title">Total Cases</h3>
            <div className="stat-icon icon-blue">
              <Activity size={24} />
            </div>
          </div>
          <div className="stat-value">{covidData.global.cases.toLocaleString()}</div>
          <div className="stat-change positive">
            <TrendingUp size={16} />
            <span>+{covidData.global.todayCases.toLocaleString()} today</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3 className="stat-title">Active Cases</h3>
            <div className="stat-icon icon-purple">
              <Users size={24} />
            </div>
          </div>
          <div className="stat-value">{covidData.global.active.toLocaleString()}</div>
          <div className="stat-change negative">
            <TrendingDown size={16} />
            <span>{calculateChange(covidData.global.active, covidData.global.cases)} of total</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3 className="stat-title">Recovered</h3>
            <div className="stat-icon icon-green">
              <Heart size={24} />
            </div>
          </div>
          <div className="stat-value">{covidData.global.recovered.toLocaleString()}</div>
          <div className="stat-change positive">
            <TrendingUp size={16} />
            <span>+{covidData.global.todayRecovered.toLocaleString()} today</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3 className="stat-title">Total Deaths</h3>
            <div className="stat-icon icon-red">
              <AlertCircle size={24} />
            </div>
          </div>
          <div className="stat-value">{covidData.global.deaths.toLocaleString()}</div>
          <div className="stat-change negative">
            <TrendingUp size={16} />
            <span>+{covidData.global.todayDeaths.toLocaleString()} today</span>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="loading">Loading charts...</div>}>
        <ChartsSection data={covidData} />
      </Suspense>

      <Suspense fallback={<div className="loading">Loading table...</div>}>
        <CountryTable countries={covidData.topCountries} />
      </Suspense>
    </div>
  )
}

export default App