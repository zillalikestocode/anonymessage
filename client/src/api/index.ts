import axios from 'axios'

const url = 'http://localhost:5000'
export const signIn = (details: any)=> axios.post(`${url}/user/signIn`, details)
export const signUp = (details: any)=> axios.post(`${url}/user/signUp`, details)