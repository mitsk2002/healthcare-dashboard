import { 
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'

const ChartsSection = ({ data }) => {
  // Process historical data for line chart
  const historicalChartData = Object.entries(data.historical.cases).map(([date, cases], index) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    cases,
    deaths: Object.values(data.historical.deaths)[index],
    recovered: Object.values(data.historical.recovered)[index]
  }))

  // Process country data for pie chart
  const countryPieData = data.topCountries.slice(0, 5).map(country => ({
    name: country.country,
    value: country.active
  }))

  // Colors for pie chart
  const COLORS = ['#3182ce', '#48bb78', '#805ad5', '#f56565', '#ed8936']

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3 className="chart-title">30-Day Trend Analysis</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Line type="monotone" dataKey="cases" stroke="#3182ce" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="deaths" stroke="#f56565" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="recovered" stroke="#48bb78" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">Top 5 Countries by Active Cases</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={countryPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {countryPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default ChartsSection