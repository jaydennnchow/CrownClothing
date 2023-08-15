import React from 'react'
import AddressForm from '../../components/address-form/address-form.component'
import AddressItem from '../../components/address-item/address-item.component'
import './address.styles.scss'

const Address = () => {
  return (
    <div className='address-container'>
        <div className='address-list'>
            <AddressItem></AddressItem>
            <AddressItem></AddressItem>
            <AddressItem></AddressItem>
            <AddressItem></AddressItem>
            <AddressItem></AddressItem>
        </div>
        <AddressForm></AddressForm>
    </div>
  )
}

export default Address