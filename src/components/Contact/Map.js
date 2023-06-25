import React from 'react'

import './Map.css'


function Map() {
  return (
    <div className='mapstyles'>
    <div className='container_map'>

    <div className ='map__card'>
        <h3 className='map__card__heading'>
            Here is me
        </h3>
        <p>กำแพงแสน u-avenue ตำบล กำแพงแสน อำเภอกำแพงแสน นครปฐม 73140</p>
        <a href='https://goo.gl/maps/KGpddzZHKkcpDUNo9' target='_blank' rel='noreferrer' className='map__card__link'>Open in Google Map</a>
    </div>


    </div>
    </div>
  )
}

export default Map