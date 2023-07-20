import styled from 'styled-components'
// styled-components 同样可以使用 svg
import { ReactComponent as ShoppingSvg } from '../../assets/shopping-bag.svg'

export const CartIconContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    cursor: pointer;
`

export const ShoppingIcon = styled(ShoppingSvg)`
    width: 24px;
    height: 24px;
`

export const ItemCount = styled.span`
    position: absolute;
    bottom: 12px;
    font-size: 10px;
    font-weight: bold;
`