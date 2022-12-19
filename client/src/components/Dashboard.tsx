import {useState} from 'react'
import {useRecoilValue} from 'recoil'
import {userState} from '../atoms/user'
import Rooms from './Rooms'

export default function(){
	const user = useRecoilValue(userState)

	return (
		<div className="text-white/75 px-8 mt-8">
			<h4 className="text-white font-['Poppins'] font-semibold tracking-[.05em] text-2xl">hello <span className="username">{user?.username.toLowerCase()}</span>,</h4>
			<Rooms />
		</div>
	)
}