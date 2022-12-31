import {atom} from 'recoil'

export const userState = atom({
	key: 'userState',
	//@ts-ignore
	default: JSON.parse(localStorage.getItem('profile'))
})