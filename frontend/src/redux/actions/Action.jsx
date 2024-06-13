export const ADD=(item)=>{
    return {
        type:"ADD_CART",
        payload:item
    }
}

// remove items from cart
export const DLT=(id)=>{
    return {
        type:"RMV_CART",
        payload:id
    }
}
// for remove or decrement cart item
export const Remove=(iteam)=>{
    return {
        type:"RMV_ONE",
        payload:iteam
    }
}