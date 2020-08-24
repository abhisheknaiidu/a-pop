function songReducer(state, action) {
  // So once our action is dispatched, our reducer runs
  // and states updated
  switch (action.type) {
    case "SET_SONG": {
      return {
        ...state,
        song: action.payload.song,
      };
    }
    case "PAUSE_SONG": {
      return {
        ...state,
        isPlaying: false,
      };
    }
    case "PLAY_SONG": {
      return {
        ...state,
        isPlaying: true,
      };
    }
    case "REPEAT_ON": {
      return {
        ...state,
        isRepeating: true,
      };
    }
    case "REPEAT_OFF": {
      return {
        ...state,
        isRepeating: false,
      };
    }
    default:
      return state;
  }
}

export default songReducer;

//  One drawback of using reducers and something like redux, and reducers
// which also relies on reducers, these are pure functions,
// we can't even interact with the outside world with them,
// So we will be using apollo tools for this, like typeDefs
