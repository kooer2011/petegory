import React from 'react'
import ('./Signup.css')

const SignUp = () => {
  return (
    <div className='signup'>
        <h1>SignUp</h1>
        <form>
          <input type={'text'} placeholder={'Name'} />
          <input type={'email'} placeholder={'Email'} />
          <input type={'password'} placeholder={'Password'} />
          <button type={'submit'}>SignUp</button>
        </form>
      </div>
  )
}

export default SignUp