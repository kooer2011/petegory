import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {

    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:8080/getUsers')
        .then(res => {
          if(res.data.Status === "Success") {
            setData(res.data.Result);
          } else {
            alert("Error")
          }
        })
        .catch(err => console.log(err));
      }, [])

      const handleDelete = (id) => {
        axios.delete('http://localhost:8080/delete/'+id)
        .then(res => {
          if(res.data.Status === "Success") {
            window.location.reload(true)
          } else {
            alert("Error")
          }
        })
        .catch(err => console.log(err));
    }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Users List</h3>
      </div>
      <Link to="/admin/dashboard/users/create" className='btn btn-success'>New</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((Users, index) => {
              return <tr key={index}>
                  <td>{Users.name}</td>
                  <td>{Users.email}</td>
                  <td>{Users.phone}</td>
                  <td>{Users.role}</td>
                  <td>
                    <Link to={`/UsersEdit/`+Users.id} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(Users.id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users