export const approveUser = async(id)=>{
     const token = localStorage.getItem("token")
     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/users/${id}/approve`, {
          method: "PATCH",
          headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
          },
     })
     const data = await res.json()
     return data
}
export const unblockUser = async(id)=>{
     const token = localStorage.getItem("token")
     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/users/${id}/unblock`, {
          method: "PATCH",
          headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
          },
     })
     const data = await res.json()
     return data
}
export const blockUser = async(id)=>{
     const token = localStorage.getItem("token")
     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/users/${id}/block`, {
          method: "PATCH",
          headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
          },
     })
     const data = await res.json()
     return data
}
export const deleteUser = async(id)=>{
     const token = localStorage.getItem("token")
     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/users/${id}`, {
          method: "DELETE",
          headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
          },
     })
     const data = await res.json()
     return data
}