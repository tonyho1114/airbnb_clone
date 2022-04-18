import React from 'react'

const Footer = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600'>
        
        <div className='space-y-4 text-xs text-gray-800'>
            <h5 className='text-xl font-bold'>About</h5>
            <p>How Airbnb works</p>
            <p>Newsroom</p>
            <p>Investors</p>
            <p>Airbnb Plust</p>
            <p>Airbnb Luxe</p>            
        </div>

        <div className='space-y-4 text-xs text-gray-800'>
            <h5 className='text-xl font-bold'>Host</h5>
            <p>Tony React</p>
            <p>Prsent</p>
            <p>ABC</p>
            <p>ABC</p>
            <p>ABC</p>            
        </div>

        <div className='space-y-4 text-xs text-gray-800'>
            <h5 className='text-xl font-bold'>COMMUNITY</h5>
            <p>Help</p>
            <p>Trust and Safety</p>
            <p>Youtube</p>
            <p>Facebook</p>
            <p>IG</p>            
        </div>

        <div className='space-y-4 text-xs text-gray-800'>
            <h5 className='text-xl font-bold'>SUPPORT</h5>
            <p>Help</p>
            <p>Trust and Safety</p>
            <p>Youtube</p>
            <p>Facebook</p>
            <p>IG</p>            
        </div>
        
    </div>
  )
}

export default Footer