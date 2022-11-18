import React from 'react';
import ExploreInstrumentDetail from '../components/ExploreInstrumentDetail';

import appleLogo from '../assets/logos/apple.svg';
import gamestopLogo from '../assets/logos/gamestop.svg';
import disneyLogo from '../assets/logos/disney.svg';
import teslaLogo from '../assets/logos/tesla.svg';
import nikeLogo from '../assets/logos/nike.svg';
import amazonLogo from '../assets/logos/amazon.svg';

const dummyData = [
    {
        name: 'Apple',
        logo: appleLogo
    },
    {
        name: 'GameStop',
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

  return (
    <div>
      <div className="h-screen">
        <div className="grid grid-cols-2 gap-4 justify-center items-center flex-wrap h-4/5 p-3 bg-explore-gray">
          {dummyData.map((brand) => (
            <div className="basis-1/2 flex justify-center items-center text-center h-full rounded-lg bg-white" key={brand.name}>
              <ExploreInstrumentDetail name={brand.name} logo={brand.logo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Explore