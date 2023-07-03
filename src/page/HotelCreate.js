import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const HotelCreate = () => {
    const navigate = useNavigate()
    const [type, setType] = useState('')
    const [price, setPrice] = useState('')
    const [title1, setTitle1] = useState('')
    const [title2, setTitle2] = useState('')
    const [title3, setTitle3] = useState('')
    const [title4, setTitle4] = useState('')
    const [title5, setTitle5] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/hotels', {type,price,title1,title2,title3,title4,title5})
        .then(res => {
            alert('create success')
            navigate('/admin/dashboard/hotel')
        }).catch(err => console.log(err))
    }
    
    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add Hotel</h2>
            <form class="row g-3 w-50" onSubmit={handleSubmit}  >
                <div class="col-12">
                    <label for="inputName" class="form-label"><strong>Type</strong></label>
                    <input type="text" class="form-control" id="inputName" placeholder='Type Room' autoComplete='off'
                    onChange={e => setType(e.target.value)}
                    />
                </div>
                <div class="col-12">
                    <label for="price" class="form-label"><strong>Price Room</strong></label>
                    <input type="text" class="form-control" id="price" placeholder='input price' autoComplete='off'
                    onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <div class="col-12">
                    <label for="price" class="form-label"><strong>Price/Hr</strong></label>
                    <input type="text" class="form-control" id="title1" placeholder='input price' autoComplete='off'
                    onChange={e => setTitle1(e.target.value)}
                    />
                </div>
                <div class="col-12">
                    <label for="title" class="form-label"><strong>Title2</strong></label>
                    <input type="text" class="form-control" id="title2" placeholder='Input Someting'
                    onChange={e => setTitle2(e.target.value)}
                    />
                </div>
                <div class="col-12">
                    <label for="title" class="form-label"><strong>Title3</strong></label>
                    <input type="text" class="form-control" id="title3" placeholder='Input Someting'
                    onChange={e => setTitle3(e.target.value)}
                    />
                </div>
                <div class="col-12">
                    <label for="title" class="form-label"><strong>Title4</strong></label>
                    <input type="text" class="form-control" id="title4" placeholder='Input Someting'
                    onChange={e => setTitle4(e.target.value)}
                    />
                </div>
                <div class="col-12">
                    <label for="title" class="form-label"><strong>Title5</strong></label>
                    <input type="text" class="form-control" id="title5" placeholder='Input Someting'
                    onChange={e => setTitle5(e.target.value)}
                    />
                </div>


                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    )
}

export default HotelCreate