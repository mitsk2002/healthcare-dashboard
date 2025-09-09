const CountryTable = ({ countries }) => {
  return (
    <div className="table-card">
      <h3 className="chart-title">Top 10 Countries Overview</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Total Cases</th>
            <th>Active Cases</th>
            <th>Recovered</th>
            <th>Deaths</th>
            <th>Tests</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.country}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src={country.countryInfo.flag} alt={country.country} style={{ width: '20px' }} />
                  {country.country}
                </div>
              </td>
              <td>{country.cases.toLocaleString()}</td>
              <td>{country.active.toLocaleString()}</td>
              <td>{country.recovered.toLocaleString()}</td>
              <td>{country.deaths.toLocaleString()}</td>
              <td>{country.tests.toLocaleString()}</td>
              <td>{country.population.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CountryTable