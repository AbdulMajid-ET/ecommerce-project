import "./AdminPageHeader.css"

function AdminPageHeader({ title, subtitle, action }) {
  return (
    <div className="admin-page-header">
      <div>
        <h1 className="admin-page-title">
          {title}
        </h1>

        <p className="admin-page-subtitle">
          {subtitle}
        </p>
      </div>

      {action && (
        <div className="admin-page-header-action">
          {action}
        </div>
      )}
    </div>
  )
}

export default AdminPageHeader