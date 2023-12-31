import { createSelector } from "reselect"





export const selectAddressReducer = state => state.address

export const selectOldAddressMap = createSelector(
    [selectAddressReducer],
    (selectAddressReducer) => selectAddressReducer.addressMap
)

export const selectAddressListFromMap = createSelector(
    [selectAddressReducer],
    (selectAddressReducer) => {
        const addressMap = selectAddressReducer.addressMap
        // console.log(selectAddressReducer);
        // console.log(JSON.stringify(addressMap));
        if(JSON.stringify(addressMap) !== "{}"){
            // console.log(addressMap);
            const addressList = addressMap.addressId.map((addressId, index) => ({
                addressId: addressId,
                city: addressMap.city[index],
                province: addressMap.province[index],
                street: addressMap.street[index],
                consignee: addressMap.consignee[index]
            }));
            return addressList
        }else{
            return []
        }
        
    }
)