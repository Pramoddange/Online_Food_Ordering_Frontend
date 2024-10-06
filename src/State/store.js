import { combineReducers, legacy_createStore } from "redux";
import { thunk } from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { authReducer } from "./Authentication/Reducer";
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import restaurantOrderReducer from "./RestaurantOrder/Reducer";
import { ingredientReducer } from "./Ingredients/Reducer";



const rooteReducer=combineReducers({
    auth:authReducer,
    restaurant:restaurantReducer,
    menu:menuItemReducer,
    cart:cartReducer,
    order:orderReducer,
    restaurantOrder:restaurantOrderReducer,
    ingredients:ingredientReducer
})
export const store=legacy_createStore(rooteReducer,applyMiddleware(thunk));