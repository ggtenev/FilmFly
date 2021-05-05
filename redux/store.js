import { createStore } from 'redux'
import inputFlowReducer from './InputFlow'

const store = createStore(inputFlowReducer)

export default store