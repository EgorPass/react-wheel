import { createStore  } from "redux"
import { setStatus } from "./reducers/reducers.js"
	
const store = createStore( setStatus)

export default store