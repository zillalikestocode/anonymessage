import { Link } from "react-router-dom";
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useRecoilValue} from 'recoil'
import {userState} from '../atoms/user'

export default () => {
	const navigate = useNavigate()
	const user = useRecoilValue(userState)

	useEffect(()=>{
		if(user?.username){
			navigate('/dashboard', {replace: true})
		}
	}, [user])

	return (
		<div className="px-10 mt-24">
			<h4 className="text-white font-['mark'] text-3xl">
				want to receive messages anonymously?
			</h4>
			<p className="mt-6 text-white/75 text-lg">
				<span className="landing_logo relative">anonymessage</span> is
				an online anonymous messaging platform for both public and
				private use cases. Organize polls or elections, ask for
				suggestions and know what others think about you without
				revealing their identity.
			</p>
			<div className="flex items-center gap-5 mt-8">
				<Link to="/login">
					<button className="px-3 py-2 bg-white font-['Barlow_Condensed'] tracking-[.25em] font-medium rounded-md">
						GET STARTED
					</button>
				</Link>
				<a href="#">
					<button className="px-3 py-2 bg-black text-white font-['Barlow_Condensed'] tracking-[.25em] font-medium rounded-md ">
						VIEW SOURCE
					</button>
				</a>
			</div>
		</div>
	);
};
