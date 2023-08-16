import React from 'react'
import './address-item.styles.scss'

const AddressItem = (props) => {

    const { address } = props

    return (
        <div className='address-item-container'>
            <div className='address-item-left'>
                Consignee
            </div>
            <div className='address-item-right'>
                {address.consignee}
            </div>
            <div className='address-item-left'>
                Province
            </div>
            <div className='address-item-right'>
                {address.province}
            </div>
            <div className='address-item-left'>
                City
            </div>
            <div className='address-item-right'>
                {address.city}
            </div>
            <div className='address-item-left'>
                Street
            </div>
            <div className='address-item-right'>
                {address.street}
            </div>
            <div className='address-item-left'>Operation</div>
            <div className='address-item-right delete'>
                delete
            </div>
        </div>
    )
}

export default AddressItem