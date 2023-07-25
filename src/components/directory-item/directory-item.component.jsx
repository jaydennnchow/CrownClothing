import React from 'react'
import { BackgroundImage, DirectoryItemBody, DirectoryItemContainer } from './directory-item.styles'
import { useNavigate } from 'react-router-dom'

const DirectoryItem = (props) => {
    
    const {item} = props
    const navigate = useNavigate()

    const navigateHandler = (route) => navigate(route)

    return (
        <DirectoryItemContainer onClick={()=>navigateHandler(item.route)}>
            <BackgroundImage imageurl={item.imageUrl}></BackgroundImage>
            <DirectoryItemBody>
                <h2>{item.title.toUpperCase()}</h2>
                <p>Shop Now</p>
            </DirectoryItemBody>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem