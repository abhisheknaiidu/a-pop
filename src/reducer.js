function songReducer(state, action) {
    // So once our action is dispatched, our reducer runs
    // and states updated
    switch (action.type) {
        case "SET_SONG": {
            return {
                ...state,
                song: action.payload.song
           }
        }
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