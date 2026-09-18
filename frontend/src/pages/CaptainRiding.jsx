import React, { useRef, useState } from 'react'
import NovaRide_logo from '../assets/NovaRide_logo.webp'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'
import gsap from 'gsap'

const CaptainRiding = (props) => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation()
  const rideData = location.state?.ride


  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])


  return (
    <div className='h-screen relative overflow-hidden'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen z-10'>
        <img className='w-16 rounded-full' src={NovaRide_logo} alt="NovaRide_logo" />
        <Link to={'/captain-home'} className='h-10 w-10 bg-white flex items-center justify-center rounded-full shadow'>
          <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>
      <div className='h-4/5'>
        <LiveTracking />
      </div>
      <div onClick={() => {
        setFinishRidePanel(true)
      }} className='bg-yellow-400 h-1/5 relative flex items-center justify-between p-6 cursor-pointer'>
        <h5 className='p-1 text-center w-[90%] absolute top-0'>
          <i className="text-3xl text-black ri-arrow-up-wide-fill"></i>
        </h5>
        <h4 className='text-xl font-semibold'>Trip in Progress</h4>
        <button className='bg-black text-white p-2 rounded-xl px-4'>Complete Ride</button>
      </div>
      <div ref={finishRidePanelRef} className='fixed w-full bottom-0 z-20 translate-y-full bg-white'>
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding
