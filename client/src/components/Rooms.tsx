import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";
import { TbPlus } from "react-icons/tb";
import { useState, useEffect } from "react";
import {motion, AnimatePresence} from 'framer-motion'

export default function () {
	const [add, setAdd] = useState(false)
	const user = useRecoilValue(userState);
	const rooms = user?.rooms;
	const rotate = add? {rotate: '45deg'} : {rotate: 0}

	return (
		<div className="mt-5">
			<div className="flex items-center">
				<button onClick={()=> setAdd(!add)} className="flex gap-1 bg-white p-2 rounded-3xl text-black text-sm font-medium ml-auto">
					Create Room
					<motion.div animate={rotate}><TbPlus fontSize={20} /></motion.div>
				</button>
			</div>
			<AnimatePresence>{add && <CreateRoom />}</AnimatePresence>
			<div className="mt-10">
				{rooms.length === 0 ? (
					<div className="flex items-center text-sm justify-center flex-col gap-3">
						<h4>You have not created any rooms yet.</h4>
						<button onClick={()=> setAdd(true)} className="flex gap-1 bg-[#121212] p-2 rounded-3xl text-black text-sm font-medium">
							Create Room
						</button>
					</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
}

function CreateRoom() {
	const [id, setId] = useState(null)
	useEffect(()=> {
		const random = Math.floor(Math.random() * 6543) 
		return setId(random)
	}, [])

	

	const details = {
		id: id,
		description: "",
		messages: [],
	};
	const [roomDetails, setDetails] = useState(details);

	const handleChange = (e: any) => {
		setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
	};

	return (
		<motion.div initial={{
			height: 0
		}} animate={{height: 'auto'}}>
			<form className="flex flex-col gap-3 w-96 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
				<h4 className="ml-3">room ID: {details.id}</h4>
				<input
					name="description"
					placeholder="title"
					onChange={(e) => handleChange(e)}
					className=" text- focus:outline-none px-4 bg-[#121212] rounded-3xl p-2 placeholder:text-black"
				/>
				{/*<div className="flex items-center gap-2 font-['Barlow_Condensed'] tracking-[.15em]">LOCKED<input type="checkbox" className="" /></div>*/}
				<button type="submit" className="rounded-3xl text-sm create p-2 ml-auto">create</button>
			</form>
		</motion.div>
	);
}
