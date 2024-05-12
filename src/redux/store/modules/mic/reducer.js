import { TOGGLE_MIC_VISIBILITY } from './actionTypes';

const initialState = {
  isMicVisible: false,
};

export function micReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MIC_VISIBILITY:
      return {
        ...state,
        isMicVisible: action.payload,
      };
    default:
      return state;
  }
};

