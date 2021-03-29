import axios from 'axios';
import setAuthToken from '../utills/setAdminToken';

export const loader = () => dispatch => {
    dispatch({
        type: 'ADMIN_SUCCESS'
    })
}

export const adminLogin = (formData, history) => async dispatch => {
    dispatch({
        type: 'SET_SPINNER'
    })
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        ...formData
    });

    try {
        const response = await axios.post('/api/products/admin', body, config);
        localStorage.setItem('token', response.data);
        dispatch({
            type: 'ADMIN_SUCCESS'
        })
        history.push('/admin');
    } catch (error) {
        localStorage.removeItem('token');
        dispatch({
            type: 'ADMIN_FAIL',
            data: error.response.data.errors
        })
        setTimeout(() => {
            dispatch({
                type: 'ADMIN_FAIL',
                data: []
            })
        }, 2500)
    }
}

export const adminLogout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({
        type: 'LOGOUT',
        data: []
    })
} 

// Middelware Handle Input "file" => For Uploading Files:
export const newProduct = formState => async dispatch => {
    const formData = new FormData();
    formData.append('type', formState.type);
    formData.append('description', formState.description);
    formData.append('inStock', formState.inStock);
    formData.append('price', formState.price);
    formData.append('image', formState.image);
    setAuthToken(localStorage.token);
    
    try {
        const response = await axios.post('/api/products/new-item', formData);
        dispatch({
            type: 'ADD_DRESS',
            data: response.data
        })
    } catch (error) {
        console.dir(error);
    }
}

export const getAll = () => async dispatch => {
    const response = await axios.get('/api/products');
    dispatch({
        type: 'GET_ALL',
        data: response.data
    })
}

export const getSingle = id => async dispatch => {
    console.log(id);
    try {
    const response = await axios.get(`/api/products/${id}`);
    dispatch({
        type: 'GET_ONE',
        data: response.data
    })
    } catch (error) {
        console.dir(error);
    }
}

export const postPost = formData => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        ...formData
    })

    try {
        const response = await axios.post('/api/products/post', body, config);
        dispatch({
            type: 'NEW_POST',
            data: response.data
        })
    } catch (error) {
        console.dir(error);
    }
}

export const deletePost = id => async dispatch => {
    setAuthToken(localStorage.token);
    try {
        await axios.delete(`/api/products/delete-post/${id}`);
        dispatch({
            type: 'REMOVE_POST',
            postId: id 
        })
    } catch (error) {
        console.dir(error);
    }
}

export const getPosts = () => async dispatch => {
    console.log('here')
    try {
        const response = await axios.get('/api/products/posts');
        console.log(response);
        dispatch({
            type: 'GET_POSTS',
            data: response.data
        })        
    } catch (error) {
        console.dir(error);
    }
}

export const deleteProduct = id => async dispatch => {
    try {
        await axios.delete(`/api/products/delete/${id}`);
        dispatch({
            type: 'REMOVE_DRESS',
            dressId: id
        })
    } catch (error) {
        console.dir(error);
    }
}

export const shippingOrder = (formData, history) => dispatch => {
    dispatch({
    type: 'SHIPPING',
    data: formData
    })
    history.push('/payment');
}

export const paymentMethod = (method, history) => dispatch => {
    dispatch({
        type: 'PAYMENT',
        data: method
    })
    history.push('/place-order');
}

export const createOrder = () => dispatch => {

}