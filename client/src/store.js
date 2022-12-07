import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension'
import { addTransactionReducer, deleteTransactionReducer, getTransactionReducer, getTransactionsReducer } from './redux/reducers/transactionsReducer'

const reducer = combineReducers({
    transactionList: getTransactionsReducer,
    transaction: addTransactionReducer,
    transactionDelete: deleteTransactionReducer,
    transactionDetails: getTransactionReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store