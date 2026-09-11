import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  fetchUsers,
  toggleUserBlock,
} from "../../../redux/slices/userSlice"

import "./Users.css"

import AdminPageHeader from "../../../components/AdminPageHeader/AdminPageHeader"

function AdminUsers() {
  const dispatch = useDispatch()

  const { users, loading, error } = useSelector(
    (state) => state.users
  )

  const handleToggleBlock = async (user) => {
    try {
      await dispatch(
        toggleUserBlock({
          id: user.id,
          isBlocked: !user.isBlocked,
        })
      ).unwrap()
    } catch (error) {
      alert("Failed to update user")
    }
  }

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (loading) {
    return (
      <p className="admin-users-message">
        LOADING USERS...
      </p>
    )
  }

  if (error) {
    return (
      <p className="admin-users-error">
        ERROR: {error}
      </p>
    )
  }

  return (
    <div className="admin-users">

      <AdminPageHeader
        title="USER MANAGEMENT"
        subtitle="MANAGE YOUR STORE USERS"
      />

      {/* User Count */}
      <div className="admin-users-count">
        TOTAL USERS: {users.length}
      </div>

      {/* Users Table */}
      <div className="admin-users-table-wrapper">

        <table className="admin-users-table">

          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>

            {users.length > 0 ? (

              users.map((user) => (

                <tr key={user.id}>

                  <td className="admin-user-name">
                    {user.fullName}
                  </td>

                  <td className="admin-user-email">
                    {user.email}
                  </td>

                  <td>
                    <span className="admin-user-role">
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        user.isBlocked
                          ? "admin-user-status blocked"
                          : "admin-user-status active"
                      }
                    >
                      {user.isBlocked
                        ? "BLOCKED"
                        : "ACTIVE"}
                    </span>
                  </td>

                  <td>
                    {user.role === "user" && (
                      <button
                        onClick={() =>
                          handleToggleBlock(user)
                        }
                        className={
                          user.isBlocked
                            ? "admin-user-action unblock"
                            : "admin-user-action block"
                        }
                      >
                        {user.isBlocked
                          ? "UNBLOCK"
                          : "BLOCK"}
                      </button>
                    )}
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="5"
                  className="admin-users-empty"
                >
                  NO USERS FOUND.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default AdminUsers