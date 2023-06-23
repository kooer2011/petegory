import React from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import './contact1.css';
import { Link } from 'react-router-dom';

// const ItemStyle = styled.div`
//     padding:2rem;
//     backgroud-color:black;
//     display: flex;
//     gap: 2rem;
//     border-radius: 8px;
//     magin-bottom:2rem;

// `
// ;

function ContactInfoItem(
    {
        icon = <PlaceIcon />,
        text = 'this is an info',

    }

) {

    return (
        <div className='itemStyles'>
            <div className='icon'>
                {icon}
            </div>


            <div className='info'>
                {text}
            </div>
        </div>

    )
}

export default ContactInfoItem