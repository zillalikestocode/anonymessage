import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";
import { TbPlus } from "react-icons/tb";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createRoom, getRooms } from "../api";
import {Link} from 'react-router-dom'

export default function () {
	const [add, setAdd] = useState(false);
	const user = useRecoilValue(userState);
	const [rooms, setRooms]: any = useState(user?.rooms);
	const rotate = add ? { rotate: "45deg" } : { rotate: 0 };
	const fetchRooms = async () => {
			const response = await getRooms({ username: user?.username });
			setRooms(response.data);
		};

	useEffect(() => {
		fetchRooms();
	}, []);
	return (
		<div className="mt-5">
			<div className="flex items-center">
				<button
					onClick={() => setAdd(!add)}
					className="flex gap-1 bg-white p-2 rounded-3xl text-black text-sm font-medium ml-auto"
				>
					Create Room
					<motion.div animate={rotate}>
						<TbPlus fontSize={20} />
					</motion.div>
				</button>
			</div>
			<AnimatePresence>{add && <CreateRoom setRooms={setRooms} setAdd={setAdd} />}</AnimatePresence>
			<div className="mt-10">
				{rooms?.length === 0 ? (
					<div className="flex items-center text-sm justify-center flex-col gap-3">
						<h4>You have not created any rooms yet.</h4>
						<button
							onClick={() => setAdd(true)}
							className="flex gap-1 bg-[#121212] p-2 rounded-3xl text-black text-sm font-medium"
						>
							Create Room
						</button>
					</div>
				) : (
					<div className="flex flex-wrap gap-5 justify-center">
						{rooms?.map((item: any) => {
							return (
								<Link key={item.id} to={`/${user.username}/${item.id}`}><div className="relative rounded-md w-32 h-44 border-white p-5 border-2">
									<h4 className="font-medium text-white font-['Barlow_Condensed'] truncate text-lg tracking-[.25em]">
										{item?.description?.toUpperCase()}
									</h4>
									<span className="absolute bottom-3 right-3 text-sm text-indigo-600">
										{item?.messages?.length}
									</span>
									<span className="absolute bottom-3 left-3 text-sm text-white/50">
										#{item?.id}
									</span>
								</div></Link>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

function CreateRoom({setRooms, setAdd}: any) {
	const user = useRecoilValue(userState);
	const [id, setId]: any = useState(Math.floor(Math.random() * 6543));

	const fetchRooms = async () => {
			const response = await getRooms({ username: user?.username });
			setRooms(response.data);
		};

	const details = {
		id,
		description: "",
		messages: [],
		owner: user?.username,
	};
	const [roomDetails, setDetails] = useState(details);

	const handleChange = (e: any) => {
		setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const response = await createRoom(roomDetails);
			console.log(response);
			fetchRooms()
			setAdd(false)
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<motion.div
			initial={{
				height: 0,
			}}
			animate={{ height: "auto" }}
			exit={{ height: 0 }}
		>
			<form
				className="flex flex-col gap-3  mx-10 mt-5"
				onSubmit={(e) => handleSubmit(e)}
			>
				<h4 className="ml-3">room ID: {details.id}</h4>
				<input
					name="description"
					placeholder="title"
					onChange={(e) => handleChange(e)}
					className=" text- focus:outline-none px-4 bg-[#121212] rounded-3xl p-2 placeholder:text-black"
				/>
				{/*<div className="flex items-center gap-2 font-['Barlow_Condensed'] tracking-[.15em]">LOCKED<input type="checkbox" className="" /></div>*/}
				<button
					type="submit"
					className="rounded-3xl text-sm create p-2 ml-auto"
				>
					create
				</button>
			</form>
		</motion.div>
	);
}
