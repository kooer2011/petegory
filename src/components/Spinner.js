import React from 'react'
import '../index.css'
import { HashLoader } from 'react-spinners'

const Spinner = () => {

  return (
    <div className='d-flex justify-content-center spinner'>
      <HashLoader color="#f8ae02" size='100'/>
    </div>
  )
}

export default Spinner;