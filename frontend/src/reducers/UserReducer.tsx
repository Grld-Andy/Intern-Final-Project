import User from "../models/User"

export const UserReducer = (state: User|null, action: {type: string, payload: User|null}): User|null => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return null
        default:
            return state
    }
}