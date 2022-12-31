import axios from 'axios'

const url = 'https://anonymessage.onrender.com'
export const signIn = (details: any)=> axios.post(`${url}/user/signIn`, details)
export const signUp = (details: any)=> axios.post(`${url}/user/signUp`, details)
export const createRoom = (details: any)=> axios.post(`${url}/room/create`, details)
export const getRooms = (details: any)=> axios.post(`${url}/room/getRooms`, details)
export const getRoom = (details: any)=> axios.post(`${url}/room/getRoom`, details)
export const sendMessage = (details: any)=> axios.post(`${url}/message/send`, details)