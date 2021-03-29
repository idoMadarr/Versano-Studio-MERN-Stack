const initState = {
    products: [],
    product: null,
    posts: [],
    isAdmin: localStorage.token ? true : false,
    isLoading: true,
    errors: [],
    purchaseMode: false,
    order: {
        shippingAddress: {
            address: null,
            city: null,
            country: null,
            postalCode: null
        },
        paymentMethod: null
    }
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADMIN_SUCCESS':
            return {
                ...state,
                isAdmin: true,
                isLoading: false
            }
        case 'LOGOUT':
        case 'ADMIN_FAIL':
            return {
                ...state,
                isAdmin: false,
                isLoading: false,
                errors: action.data
            }
        case 'ADD_DRESS':
            return {
                ...state,
                products: [action.data, ...state.products],
                isLoading: false
            }
        case 'GET_ALL': 
            return {
                ...state,
                products: action.data,
                product: null,
                isLoading: false
            }
        case 'GET_ONE':
            return {
                ...state,
                product: action.data,
                isLoading: false,
                purchaseMode: true
            }
        case 'GET_POSTS':
            return {
                ...state,
                posts: action.data,
                isLoading: false
            }
        case 'NEW_POST':
            return {
                ...state,
                posts: [action.data ,...state.posts],
                isLoading: false
            }
        case 'REMOVE_POST': 
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.postId)
            }
        case 'REMOVE_DRESS':
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.dressId)
            }
        case 'SHIPPING': 
            return {
                ...state,
                order: {...state.order, shippingAddress: action.data}
            }
        case 'PAYMENT':
            return {
                ...state,
                order: {...state.order, paymentMethod: action.data}
            }
        case 'SET_SPINNER':
            return {
                ...state,
                isLoading: true
            }
        default: return state;
    }
}

export default reducer;