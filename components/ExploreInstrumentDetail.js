import React, { useEffect } from 'react';

const ExploreInstrumentDetail = ({ name, logo }) => {
    useEffect(() => {
      console.log(logo)
    }, [])
    

  return (
    <div>
        <img src={logo} alt={`${name} logo`} />
        <p>{name}</p>
    </div>
  )
}

export default ExploreInstrumentDetail