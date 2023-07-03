import React, { useEffect, useState } from 'react'
import NavbarHeader from '../components/Navbar'
import axios from 'axios'
import roomstd from '../imgs/standard room.jpg'
import roomdeluxe from '../imgs/deluxe room.jpg'
import { Link } from 'react-router-dom'


const HotelDetail = () => {
    // const [hotels, setHotels] = useState([])
    const [data, setData] = useState([])
    const images = [
            roomstd,
            roomdeluxe
    ]


    // const getHotelData = async () => {
    //     try {
    //         const res = axios.get('/api/hotels/getDetailHotels')
            
    //         if (res.data.success) {
    //             setHotels(res.data.data)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        fetch('/api/hotels/getDetailHotels', {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setData(data.data)
        })
    }, [])

    return (
        <>
            <NavbarHeader />
            <div className='txtHead'>
                <h1>CAT HOTEL</h1>
            </div>
            <section>
            {data && images.map((img,i) => (
            <div className='about container'>
          <div className='row justify-content-center'>
            <div className='col-sm-5'>
              <img src={img} className='img-fluid' />
            </div>
            <div className='col-sm-5'>
              <h6>
                About <span>{data[i]?.type}</span>
              </h6>
              <p><strong>💰ราคา {data[i]?.price} บาท/คืน รองรับแมวได้ 1-2 ตัว</strong></p>
              <p>บริการฝากเลี้ยง (รายชั่วโมง)
                ค่าบริการ ชั่วโมงละ {data[i]?.title1} บาท</p>
              <p>{data[i]?.title2}</p>
              <p>{data[i]?.title3}</p>
              <p>{data[i]?.title4}</p>
              <p>{data[i]?.title5}</p>
              {/* <Link to='/hotel/detail' className='btn btn-primary float-end' onClick={handleClick}>
                Read More <i className='fas fa-long-arrow-alt-right'></i>
              </Link> */}
            </div>
          </div>
        </div>
        ))}
            </section>
        </>
    )
}

export default HotelDetail