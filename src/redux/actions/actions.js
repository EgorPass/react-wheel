import { SET_TRIGER, SET_WHEEL_ROTATE, SET_WHEEL_STOP, SET_WHEEL_CLOSE, SET_WHEEL_ERROR_FIELD } from ".././constants.js"


export const setTrigerStatus = (status) => {
	
	return {
		type: SET_TRIGER,
		status,
	}
}

export const setWhellRotate = (status) => {

	return {
		type: SET_WHEEL_ROTATE,
		status,
	}
}

export const setWhellStop = (status) => {

	return {
		type: SET_WHEEL_STOP,
		status,
	}
}

export const setCloseWheel = (status) => {

	return {
		type: SET_WHEEL_CLOSE,
		status,
	}
}

export const setErrorField = ({
			status,
			anchor,
			name,
		}) => {

	return {
		type: SET_WHEEL_ERROR_FIELD,
		status,
		anchor,
		name,
	}
}
