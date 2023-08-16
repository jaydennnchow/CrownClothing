import React from 'react'
import './address-item.styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../store/user/user.selector'
import { deleteAddressStart } from '../../store/address/address.action'
import { selectAddressListFromMap } from '../../store/address/address.selector'

const AddressItem = (props) => {

    const { address } = props
    const dispatch = useDispatch()
    const currentUser = useSelector(getCurrentUser)
    const addressList = useSelector(selectAddressListFromMap)

    const handleDeleteAddress = (addressId) => {
        // console.log(addressId);
        // {seconds: 1692182586, nanoseconds: 661000000}
        dispatch(deleteAddressStart(currentUser.id, addressId, addressList))
    }

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
            <div className='address-item-right delete' onClick={() => handleDeleteAddress(address.addressId)}>
                delete
            </div>
        </div>
    )
}

export default AddressItem