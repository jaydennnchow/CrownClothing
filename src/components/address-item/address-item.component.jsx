import React from 'react'
import './address-item.styles.scss'

const AddressItem = () => {
  return (
    <div className='address-item-container'>
        <div className='address-item-left'>
            Province
        </div>
        <div className='address-item-right'>
            广东省
        </div>
        <div className='address-item-left'>
            City
        </div>
        <div className='address-item-right'>
            广州市
        </div>
        <div className='address-item-left'>
            Street
        </div>
        <div className='address-item-right'>
            劳美美家
        </div>
        <div className='address-item-left'>Operation</div>
        <div className='address-item-right'>
            delete
        </div>
    </div>
  )
}

export default AddressItem