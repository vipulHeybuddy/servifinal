import { TOGGLE_MIC_VISIBILITY } from './actionTypes';

export const toggleMicVisibility = (isVisible) => {
  return {
    type: TOGGLE_MIC_VISIBILITY,
    payload: isVisible,
  };
};