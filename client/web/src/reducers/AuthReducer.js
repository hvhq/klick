export const AuthReducer = (state, action) => {
    const {type, payload : {
        authLoading, isAuthenticated, user, isPlayer
    }} = action

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user,
                isPlayer
            }
        
        default:
            return state
    }
}