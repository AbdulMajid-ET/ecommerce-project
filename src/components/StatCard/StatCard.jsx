import "./StatCard.css"

function StatCard({ title, value }) {
  return (
    <div className="admin-stat-card">
      <p className="admin-stat-title">
        {title}
      </p>

      <p className="admin-stat-value">
        {value}
      </p>
    </div>
  )
}

export default StatCard