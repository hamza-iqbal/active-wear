import actions from "./actions";

const dummy_users = [
    {
        username:'admin',
        type:'admin',
        password:'admin'
    },
    {
        username:'S&M',
        type:'S&M',
        password:'S&M'
    },
    {
        username:'P&S',
        type:'P&S',
        password:'P&S'
    },
    {
        username:'IE',
        type:'IE',
        password:'IE'
    },
    {
        username:'FS',
        type:'FS',
        password:'FS'
    },
    {
        username:'PPC',
        type:'PPC',
        password:'PPC'
    },
]

const initState = {
    loading: false,
    allUsers:[],
    user:{
        username:'S&M',
        type:'S&M',
        password:'S&M'
    }
}

export default function authReducer(state = initState, action) {
    switch (action.type) {
        case actions.TOGGLE_LOADER:
            console.log("toggle logger...",action.payload);
            return Object.assign({}, state, {
                loading: action.payload
            });
        case actions.SAVE_LOGIN_DETAILS:
            console.log("user...",action.payload);
            let obj = dummy_users.filter(u => u.username === action.payload.username)[0]

            return Object.assign({}, state, {
                user: obj
            });
        default:
            return state;
    }
}
