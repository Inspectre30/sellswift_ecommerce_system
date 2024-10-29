import React from 'react'
import { assets } from '../assets/seller_assets/assets'

const Add = () => {
  return (
    <form className='flex flex-col w-full items-start gap-3' >
      <div>
        <p className='mb-2'>Upload Image</p>

        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
      </div>

      <div>
        <div>
          <p>Product Category</p>
          <select>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Foods">Foods</option>
            <option value="Gadgets">Gadgets</option>
          </select>
        </div>
        <div>
          <p>Sub Category</p>
          <select>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Main Dish">Main Dish</option>
            <option value="Breakfast Favourites">Breakfast Favourites</option>
            <option value="Smart Phones">Smart Phones</option>
          </select>
        </div>
      </div>
    </form>
  )
}

export default Add