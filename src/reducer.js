function songReducer(state, action) {
    // So once our action is dispatched, our reducer runs
    // and states updated
    switch (action.type) {
        case "PAUSE_SONG": {
            return {
                ...state,
                isPlaying: false
           }
        }
        case "PLAY_SONG": {
            return {
                ...state,
                isPlaying: true
           }
        }
        default:
            return state;
    }
}

export default songReducer