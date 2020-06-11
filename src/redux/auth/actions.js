const actions = {
    TOGGLE_LOADER: 'TOGGLE_LOADER',
    toggleLoader: (payload) => ({
        type: actions.TOGGLE_LOADER,
        payload
    }),
    BASIC_FETCH: 'BASIC_FETCH',
    basicFetch: (payload) => ({
        type: actions.BASIC_FETCH,
        payload
    }),
    LOGIN: 'LOGIN',
    login: (payload) => ({
        type: actions.LOGIN,
        payload
    }),
    SAVE_LOGIN_DETAILS: 'SAVE_LOGIN_DETAILS',
    saveLoginDetails: (payload) => ({
        type: actions.SAVE_LOGIN_DETAILS,
        payload
    }),
};

export default actions;