import React, { useEffect } from 'react'
import AddressForm from '../../components/address-form/address-form.component'
import AddressItem from '../../components/address-item/address-item.component'
import './address.styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddressStart } from '../../store/address/address.action'
import { getCurrentUser } from '../../store/user/user.selector'
import { selectAddressListFromMap } from '../../store/address/address.selector'

const Address = () => {

  const currentUser = useSelector(getCurrentUser)
  const addressList = useSelector(selectAddressListFromMap)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAddressStart({ userId: currentUser.id }))
  }, [])


 

  return (
    <div className='address-container'>
      <div className='address-list'>
        {
          addressList && addressList.length > 0 ? (
            addressList.map(address => <AddressItem key={address.addressId} address={address}></AddressItem>)
          ) : (
            <p>
              Don't have an address yet? Go ahead and add one!
            </p>
          )
        }
      </div>
      <AddressForm></AddressForm>
    </div>
  )
}

export default Address