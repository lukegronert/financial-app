import React, { useState } from 'react';

const activeStyles = 'p-2 bg-explore-blue text-white'

const TimeButton = ({ text }) => {
    const [active, setActive] = useState(false);

    if(active) {
        return (
            <button className={`w-3/4 ${activeStyles}`} onClick={() => setActive(false)}>
                {text}
            </button>
        )
    } else {
        return (
            <button className='w-3/4' onClick={() => setActive(true)}>
            {text}
        </button>
        )
    }
}

export default TimeButton