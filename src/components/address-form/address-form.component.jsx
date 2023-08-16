import React, { useEffect, useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './address-form.styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../store/user/user.selector'
import { addAddressStart } from '../../store/address/address.action'
import { selectOldAddressMap } from '../../store/address/address.selector'


const DefaultformFields = {
    userId: '',
    consignee: '',
    province: '',
    city: '',
    street: ''
}

const AddressForm = () => {

    const [address, setAddress] = useState(DefaultformFields)
    const { consignee, province, city, street } = address
    const currentUser = useSelector(getCurrentUser)
    const { displayName, id } = currentUser
    const oldAddressMap = useSelector(selectOldAddressMap)

    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser) {
            address.consignee = displayName
            address.userId = id
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(address)
        dispatch(addAddressStart(address,oldAddressMap))
        resetFormFields()
    }

    // 表单的双向绑定
    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }
    // 重置表单
    const resetFormFields = () => setAddress(DefaultformFields)

    return (
        <div className='address-form-container'>
            <h2>Add an address</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
                <FormInput
                    name='consignee'
                    label='Consignee'
                    type='text'
                    required
                    onChange={handleChange}
                    value={consignee}
                ></FormInput>
                <FormInput
                    name='province'
                    label='Province'
                    type='text'
                    required
                    onChange={handleChange}
                    value={province}
                ></FormInput>
                <FormInput
                    name='city'
                    label='City'
                    type='text'
                    required
                    onChange={handleChange}
                    value={city}
                ></FormInput>
                <FormInput
                    name='street'
                    label='Street'
                    type='text'
                    required
                    onChange={handleChange}
                    value={street}
                ></FormInput>
                <div>
                    <Button type='submit' >SAVE</Button>
                </div>
            </form>
        </div>
    )
}

export default AddressForm