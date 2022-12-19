import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";
import {TbBell} from 'react-icons/tb'
const Header = () => {
	const user = useRecoilValue(userState);

	return (
		<header>
			<nav className="flex text-white py-2 pt-4 items-center m-auto rounded-md px-5">
				{!user?.username ? (
					<h4 className="font-['Rubik'] font-semibold text-2xl">
						anonymessage
					</h4>
				) : (
					<div className="flex items-center gap-3"><div className="flex items-center gap-3 rounded-3xl p-2 bg-[#121212]">
					<div className="bg-fuchsia-600 flex items-center justify-center h-7 w-7 rounded-full">{user?.username[0]}</div>
						<h4 className="text-sm font-medium">{user?.username}</h4>
					</div>
					<button><TbBell fontSize={25}/></button>
					</div>
				)}
				<button className="ml-auto flex items-center">
					<HiMenuAlt4 fontSize={30} />
				</button>
			</nav>
		</header>
	);
};

export default Header;
