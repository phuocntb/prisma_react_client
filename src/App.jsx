import axios from 'axios';
import { useEffect, useState } from 'react'


function App() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axios.get("http://127.0.0.1:3000/users")
    .then(res => {
      setUsers(res.data)
    })
  })

  return (
    <>
    <button onClick={() => {
            axios.post("http://127.0.0.1:3000/users", {
              name: window.prompt("Nhap ten?")
            })
            .then(res => {
              setUsers([...users, res.data])
            })
    }}>ADD</button>
<table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user, index) => {
          return (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>
                <button onClick={() => {
                axios.delete("http://127.0.0.1:3000/users/" + user.id)
                .then(res => {
                    if(res.data) {
                      setUsers(users.filter(userFilter => userFilter.id != user.id))
                    }
                })
              }} className='btn btn-danger'>Delete</button>
                <button onClick={() => {
                   let editData = {
                     name: window.prompt("Edit", user.name)
                   }
                   axios.patch("http://127.0.0.1:3000/users/" + user.id, editData)
                .then(res => {
                    setUsers(users.map(userMap => {
                      if(userMap.id == user.id) {
                        return res.data
                      }
                      return userMap
                    }))
                })

                }} className='btn btn-primary'>Edit</button>
              </td> 
              <td>
                <ul>
                  {
                    user.posts?.map((post, index) => {
                      return (
                        <li>STT: {index + 1}, content: {post.title}</li>
                      )
                    })
                  }
                </ul>
              </td>
            </tr>
          )
        })
      }

    </tbody>
  </table>
    </>
  )
}

export default App
