export const ActiveDemoRequestsReducer = (state: number, action: {type: string, payload: number}): number => {
    switch (action.type) {
        case 'INCREMENT':
            return state + action.payload;
        case 'DECREMENT':
            return state - action.payload;
        case 'SET':
            return action.payload;
        default:
            return state;
    }
};
