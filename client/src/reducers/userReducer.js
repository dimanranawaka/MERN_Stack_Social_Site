
// This line is defining and exporting a constant named 'initialState' with a value of null.
// This 'initialState' is typically used in Redux as the starting state for a reducer.
// In this case, the initial state of the user is set to null, indicating that there is no user information when the application starts.

export const initialState = null;

export const reducer = (state, action) => {

    // Check if the action type is 'USER'
    if (action.type === 'USER') {
        // If it is, return the payload of the action
        return action.payload;
    }
    // If the action type is not 'USER', return the current state unchanged
    return state;

}