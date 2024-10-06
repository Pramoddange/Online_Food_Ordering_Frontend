import { api } from "../../component/Config/Api";
import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_MENU_ITEM_AVAILABILITY_REQUEST, UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS } from "./ActionType";

export const CreateMenuItem=({menu,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_MENU_ITEM_REQUEST})
        try {
            const {data}=await api.post("/api/admin/food",menu,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            });
            console.log("created menu",data)
            dispatch({type:CREATE_MENU_ITEM_SUCCESS,payload:data})
        } catch (error) {
            console.log("catch error",error)
            dispatch({type:CREATE_MENU_ITEM_FAILURE, payload:error});
        }
    }
}
export const GetMenuItemsBYRestaurantID=(reqData)=>{
    return async(dispatch)=>{
        dispatch({type:GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST});
        try {
            const {data}=await api.get(`/api/food/restaurant/${reqData.id}?
                vegetarian=${reqData.vegetarian}&seasonal=${reqData. seasonal}&nonveg=${reqData.nonveg}&
                food_category=${reqData. foodCategory}&restaurantId=${reqData.id}`,
                {
                    headers:{
                        Authorization:`Bearer ${reqData.jwt}`
                    }
                }
            );
            console.log("menu item by restaurant id", data);
            dispatch({type:GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS, payload:data})
        } catch (error) {
            console.log("catch error", error)
            dispatch({type:GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE, payload:error});
        }
    }
}
export const SearchMenuItems=({keyword, jwt})=>{
    return async(dispatch)=>{
        dispatch({type:SEARCH_MENU_ITEM_REQUEST});
        try {
            const {data}=await api.get(`/api/food/search?name=${keyword}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            });
            console.log("search menu item", data);
            dispatch({type:SEARCH_MENU_ITEM_SUCCESS, payload:data})
        } catch (error) {
            console.log("catch error", error)
            dispatch({type:SEARCH_MENU_ITEM_FAILURE, payload:error});
        }
    };
}
export const getAllIngredientsOfMenuItem=(reqData)=>{
   return async(dispatch)=>{
    dispatch({type:GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST});
    try {
        const {data}=await api.get(`/api/food/ingredients/${reqData.menuItemID}`,{
            headers:{
                Authorization:`Bearer ${reqData.jwt}`
            }
        });
        console.log("get all ingredients of menu item", data);
        dispatch({type:GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error", error)
        dispatch({type:GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE, payload:error});
    }
   }
}
export const updateMenuItemsAvailability=({foodId,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:UPDATE_MENU_ITEM_AVAILABILITY_REQUEST});
        try{
            const {data}=await api.put(`/api/admin/food/${foodId}`,{},{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            });
            console.log("update menu item availability", data);
            dispatch({type:UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS, payload:data})
        }catch(error){
            console.log("catch error", error)
            dispatch({typee:UPDATE_MENU_ITEM_AVAILABILITY_REQUEST, payload:error});
        }
    }
}

export const deleteFoodAction=({foodId, jwt})=>{
    return async(dispatch)=>{
        dispatch({type:DELETE_MENU_ITEM_REQUEST});
        try{
            const {data}=await api.delete(`/api/admin/food/${foodId}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            });
            console.log("delete food", data);
            dispatch({type:DELETE_MENU_ITEM_SUCCESS, payload:foodId})
        }catch(error){
            console.log("catch error", error)
            dispatch({typee:DELETE_MENU_ITEM_FAILURE, payload:error});
        }
    }
}