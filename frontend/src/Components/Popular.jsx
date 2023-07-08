import React from 'react'
import Products from './Products'

const Popular = () => {
  return (
    <div className="flex flex-col items-center md:mt-[5%] mt-[20%] p-2.5">
        <h1 className="m-2.5 p-2.5 text-4xl font-bold">Popular Products</h1>
        <Products cat={""} sort={"newest"} />
        </div>
  )
}

export default Popular