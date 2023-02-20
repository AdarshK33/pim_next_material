import { INIT_APP_FAILURE, INIT_APP_SUCCESS, SET_EMAIL } from '../types/types';

const initialState = {
	user: {},
	loggedIn: false,
	guestemail: null,
}

const app = (state = initialState, action) => {
	switch (action.type) {
		case INIT_APP_SUCCESS:
			return {
				...state,
				...action.payload,
			};
			case SET_EMAIL:
				return {
					...state,
					guestemail: action.email
				}
		default:
			return state;
	}
};

export default app;
