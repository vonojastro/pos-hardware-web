import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension'
import { addTransactionReducer, deleteTransactionReducer, getTransactionReducer, getTransactionsReducer } from './redux/reducers/transactionsReducer'
import { userLoginReducer } from './redux/reducers/userReducer'
import { addProductReducer, getProductsReducer } from './redux/reducers/productsReducers'

const reducer = combineReducers({
    transactionList: getTransactionsReducer,
    transaction: addTransactionReducer,
    transactionDelete: deleteTransactionReducer,
    transactionDetails: getTransactionReducer,
    userLogin: userLoginReducer,
    productList: getProductsReducer,
    product: addProductReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store