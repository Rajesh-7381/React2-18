const INIT_STATE = {
    carts: []
};

export const cartReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "ADD_CART":
            const iteamindex=state.carts.findIndex((iteam)=>iteam.id===action.payload.id);
            if(iteamindex >= 0){
                state.carts[iteamindex].qnty +=1;

            }else{
                const temp={...action.payload,qnty:1};
                return {
                    ...state,
                    carts: [...state.carts, temp]
                }
            }
           
        case "RMV_CART":
            const data=state.carts.filter((el)=>el.id !==action.payload);
            return {
                ...state,
                carts: data
            };   

        case "RMV_ONE":
            const iteamindex_dec=state.carts.findIndex((iteam)=>iteam.id===action.payload.id);
            if(state.carts[iteamindex_dec].qnty >= 1){
                const dltitem=state.carts[iteamindex_dec].qnty -=1;
                
                return {
                    ...state,
                    carts: [...state.carts]
                };  
            }else if(state.carts[iteamindex_dec].qnty === 1){
                const data=state.carts.filter((el)=>el.id !==action.payload);
            return {
                ...state,
                carts: data
            }; 
            }
            
              
        default:
            return state; // Return current state for unknown action types
    }
};
