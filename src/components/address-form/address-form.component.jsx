import React, { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './address-form.styles.scss'


const DefaultformFields = {
    consignee: '',
    consigneeId: '',
    province: '',
    city: '',
    street: ''
}

const AddressForm = () => {

    const [address, setAddress] = useState(DefaultformFields)
    const { consignee, province, city, street } = address

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
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
            <form onSubmit={handleSubmit} autocomplete="off">
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