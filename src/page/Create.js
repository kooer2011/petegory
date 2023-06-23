import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../index.css'

const Create = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        pet: ''
    })
    console.log(data)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/create', data)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/admin/dashboard/users')
                } else {
                    alert('Error')
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add User</h2>
            <form class="row g-3 w-50" onSubmit={handleSubmit} >
                <div class="col-12">
                    <label for="inputName" class="form-label"><strong>Name</strong></label>
                    <input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                        onChange={e => setData({ ...data, name: e.target.value })} />
                </div>
                <div class="col-12">
                    <label for="inputEmail4" class="form-label"><strong>Email</strong></label>
                    <input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
                        onChange={e => setData({ ...data, email: e.target.value })} />
                </div>
                <div class="col-12">
                    <label for="inputPassword4" class="form-label"><strong>Password</strong></label>
                    <input type="password" class="form-control" id="inputPassword4" placeholder='Enter Password'
                        onChange={e => setData({ ...data, password: e.target.value })} />
                </div>
                <div class="col-12 ">
                    <p>Please select your pet type</p>
                    <input type="radio" id="inputPet" value='Cat' name='pet'
                        onChange={e => setData({ ...data, pet: e.target.value })} />  
                    <label for="cat" className='petRadio'>Cat</label>

                    <input type="radio" id="inputPet" value='Dog' name='pet'
                        onChange={e => setData({ ...data, pet: e.target.value })} />
                    <label for="dog" className='petRadio'>Dog</label>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    )
}

export default Create