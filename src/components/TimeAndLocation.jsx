import React from 'react'

const TimeAndLocation = ({
  weather: {formattedLocalTime, name, country}}) => {
  return (
    <div>
      <div className='flex items-center justify-center'>
        <p className='text-sm font-extralight sm:text-xl'>
            {formattedLocalTime}
        </p>
      </div>

      <div className='flex items-center justify-center my-3'>
        <p className='text-3xl font-medium sm:text-sm'>{`${name},${country}`}</p>
      </div>
    </div>
  )
}

export default TimeAndLocation

