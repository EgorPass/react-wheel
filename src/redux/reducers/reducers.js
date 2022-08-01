import { SET_TRIGER, SET_WHEEL_ROTATE, SET_WHEEL_STOP, SET_WHEEL_CLOSE, SET_WHEEL_ERROR_FIELD } from ".././constants.js"

const stateWheel = {
												trigerOn: true,
												wheelRotate: false,
												rotateComplite: false,
												closeWheel: false,
												errorStatus: false,
												errorField: {
													status: false,
													anchor: null,
													name: null,
												}
										}

export const setStatus = (state = stateWheel, {type, status, anchor, name  }) => {
	switch(type) {
		case SET_TRIGER: 
				return {
								...state, 
									trigerOn: status,
								
							};
		case SET_WHEEL_ROTATE: 
				return {
								...state, 
									wheelRotate: status,
								 
							};


		case SET_WHEEL_STOP: 
				return {
								...state, 
									wheelRotate: !status, 
									rotateComplite: status,
								
							};

		case SET_WHEEL_CLOSE: 
			return {
							...state,
							closeWheel: status,
						};	
		
		case SET_WHEEL_ERROR_FIELD:
			return {
							...state,	
							errorStatus: status,
							errorField: {
								status,
								anchor,
								name,
							}
						}

		default: return state;
	}
}