import {combineReducers,compose,createStore,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import user from "./reducer/user";
import theme from "./reducer/theme";
import busket from "./reducer/busket";
import profile from "./reducer/profile";
import banners from "./reducer/banners";
import categories from "./reducer/categories";
import products from "./reducer/products";
import notifications from "./reducer/notifications";
import latestProduct from "./reducer/latestProduct"
import searchProduct from "./reducer/searchProducts";
import slip from "./reducer/slip"
import history from "./reducer/history";

const reducers =combineReducers({
    user,
    theme,
    busket,
    profile,
    banners,
    categories,
    products,
    notifications,
    latestProduct,
    searchProduct,
    slip,
    history
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =createStore(reducers,{},composeEnhancers(applyMiddleware(ReduxThunk)));


export default store