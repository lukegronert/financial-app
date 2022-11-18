import React, { useEffect } from 'react';
import ExploreInstrumentDetail from '../components/ExploreInstrumentDetail';

import { appleLogo } from '../assets/logos/apple.svg';
import { gamestopLogo } from '../assets/logos/gamestop.svg';
import { disneyLogo } from '../assets/logos/disney.svg';
import { teslaLogo } from '../assets/logos/tesla.svg';
import { nikeLogo } from '../assets/logos/nike.svg';
import { amazonLogo } from '../assets/logos/amazon.svg';

const dummyData = [
    {
        name: 'Apple',
        logo: appleLogo
    },
    {
        name: 'Gamestop',
        logo: gamestopLogo
    },
    {
        name: 'Disney',
        logo: disneyLogo
    },
    {
        name: 'Tesla',
        logo: teslaLogo
    },
    {
        name: 'Nike',
        logo: nikeLogo
    },
    {
        name: 'Amazon',
        logo: amazonLogo
    },
];

const Explore = () => {
  useEffect(() => {
    console.log(appleLogo)
  }, [])
  return (
    <div>
      {dummyData.map((brand) => (
        <ExploreInstrumentDetail name={brand.name} logo={brand.logo} key={brand.name}/>
      ))}
    </div>
  )
}

export default Explore