import React from 'react'
// import SHOP_DATA from '../../shop-data'
import DirectoryItem from '../directory-item/directory-item.component'
import './directory.styles.scss'


const DATA = [
  {
      id:1,
      title:'Hats',
      imageUrl:'https://i.ibb.co/ZYW3VTp/brown-brim.png',
      route:'shop/hats'
  },
  {
      id:2,
      title:'Sneakers',
      imageUrl:'https://i.ibb.co/0s3pdnc/adidas-nmd.png',
      route:'shop/sneakers'
  },
  {
      id:3,
      title:'Jackets',
      imageUrl:'https://i.ibb.co/ZYW3VTp/brown-brim.png',
      route:'shop/jackets'
  },
  {
      id:4,
      title:'Womens',
      imageUrl:'https://i.ibb.co/7CQVJNm/blue-tank.png',
      route:'shop/womens'
  },
  {
      id:5,
      title:'Mens',
      imageUrl:'https://i.ibb.co/xJS0T3Y/camo-vest.png',
      route:'shop/mens'
  }
]

const Directory = () => {

  return (
    <div className="directory-container">
      {DATA.map(item => {
        return (
            <DirectoryItem item={item} key={item.id}></DirectoryItem>
        )
      })}
    </div>
  )
}

export default Directory