import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MaponSearchPage from '../components/MaponSearchPage'
import { useRouter } from 'next/dist/client/router'
import {format} from 'date-fns'
import InfoCard from '../components/InfoCard'


const Search = ({searchResults}) => {
    const router = useRouter();
    const [formattedStartDate, setFormattedStartDate] = useState(format(new Date(),"dd MMMM yy"))
    const [formattedEndDate, setFormattedEndDate] = useState(format(new Date(),"dd MMMM yy"))
    
    const {location, noOfGuests} = router.query
    const range =`${formattedStartDate}-${formattedEndDate}`

    useEffect(() => {
        if(router.isReady){
            const { startDate, endDate } = router.query;
            setFormattedStartDate(format(new Date(startDate),"dd MMMM yy"))
            setFormattedEndDate(format(new Date(endDate),"dd MMMM yy"))
         }
    }, [router.isReady, router.query]);

  return (
    <div >
        <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

        <main className='flex'>
            <section className='flex-grow pt-14 px-6'>
                <p className='text-xs'> 300+ stays - {range} - for {noOfGuests} guests</p>
                <h1 className='text-3xl font-semibold mt-2 mb-6'> Stays in {location}</h1>
                <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                    <p className='button'>Cancellation Flexibility</p>
                    <p className='button'>Type of Place</p>
                    <p className='button'>Price</p>
                    <p className='button'>Rooms and Beds</p>
                    <p className='button'>More filters</p>
                </div>
                <div className='flex flex-col'>
                    {searchResults.map(({img,location,title,description,star,price,total})=>(
                        <InfoCard 
                            key={img}
                            img={img}
                            location={location}
                            title={title}
                            description={description}
                            star={star}
                            price={price}
                            total={total}
                        />
                    ))}
                </div>
            </section>
            {/* xl:min-w-[600px] */}
            <section className='hidden xl:flex xl:flex-col xl:min-w-[600px]'>
                <MaponSearchPage searchResults={searchResults}/>
            </section>
        </main>

        <Footer />
    </div>
  )
}

export default Search

export async function getServerSideProps() {
    const searchResults = await fetch('https://links.papareact.com/isz')
    .then(
        (res) => res.json()
    )  

    return {
        props:{
            searchResults,
        }
    }
}