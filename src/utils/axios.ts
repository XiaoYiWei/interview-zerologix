import axios from 'axios'

export function jwtInterceptor() {}

export const apiInstance = axios.create({
    baseURL: 'https://g1api.finlogix.com/v1',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
})
apiInstance.interceptors.request.use((config) => {
    // add auth header with jwt if account is logged in and request is to the api url
    const jwt = localStorage.getItem('jwt')

    if (jwt && config && config.headers) {
        config.headers['Authorization'] = `Bearer ${jwt}`
    }

    return config
})
