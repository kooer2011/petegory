import Reac,{useState} from 'react'
import './contact1.css';

// const FormStyle = styled.form`
//     width: 100%;


// `;




function ContactForm() {
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [message , setMessage] = useState('')
  return (
    <div>
    <form className='formstyles'>
        <div className='form-group'>
            <label className='label_content' htmlFor="name">
                Your Name
            <input className='input_content' type='text' id='name' name='name ' value={name}
            onChange={(e) => setName(e.target.value)}
            />


            </label>
        </div>
        <div className='form-group'>
            <label className='label_content' htmlFor="email">
                Your Email
            <input className='input_content' type='text' id='email' email='email' value={email}
            onChange={(e) => setEmail(e.target.value)}
            />


            </label>
        </div>

        <div className='form-group'>
            <label className='label_content' htmlFor="message">
                Your Message
            <textarea className='input_content message_textarea ' type='textarea' id='message' message='message' value={message}  multiline={true}
            onChange={(e) => setMessage(e.target.value)}
            />


            </label>
        </div>
            <button className='content_button' type='submit'>Send</button>
    </form>
    </div>
  )
}

export default ContactForm