import React from 'react';
import ExploreInstrumentDetail from '../components/ExploreInstrumentDetail';

import { RiCloseLine } from 'react-icons/ri'

import appleLogo from '../assets/logos/apple.svg';
import gamestopLogo from '../assets/logos/gamestop.svg';
import disneyLogo from '../assets/logos/disney.svg';
import teslaLogo from '../assets/logos/tesla.svg';
import nikeLogo from '../assets/logos/nike.svg';
import amazonLogo from '../assets/logos/amazon.svg';
import netflixLogo from '../assets/logos/netflix.svg';
import amcLogo from '../assets/logos/amc.svg';

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
    {
        name: 'Netflix',
        logo: netflixLogo
    },
    {
        name: 'AMC',
        logo: amcLogo
    },
];

const Explore = () => {

  return (
    <div className="bg-explore-gray h-full">
      <div className="h-1/4 bg-white rounded-t-xl px-3">
        <div className="flex flex-row justify-between items-center py-3">
          <h1 className="text-explore-blue font-extrabold text-3xl">
            Welcome!
          </h1>
          <RiCloseLine size='2em' />
        </div>
        <p className="font-bold text-gray-400">Choose your interests to follow and trade on your terms.</p>
        <input type="text" />
      </div>
      <p></p>
      <div className="h-screen">
        <div className="grid grid-cols-2 gap-4 justify-center items-center flex-wrap h-full p-3">
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