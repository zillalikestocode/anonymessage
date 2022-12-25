import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoom } from "../api";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";
import {TbLink, TbBrandWhatsapp} from 'react-icons/tb'

export default function () {
	const location = useLocation()
	console.log(location)
	const { id, username } = useParams();
	const [details, setDetails]: any = useState(null);
	const user = useRecoilValue(userState);
	const [disabled, setDisabled] = useState(true)
	async function sendMessage(e: any){
		e.preventDefault()
	}
	useEffect(() => {
		const fetchDetails = async () => {
			const response = await getRoom({ id, username });
			setDetails(response.data);
		};
		fetchDetails();
	}, []);
	console.log(details);

	return (
		<div className="text-white px-7 py-5">
			<div className="space-y-1">
				<h4 className="text-2xl font-['Barlow_Condensed'] tracking-[.5em] font-semibold">
					{details?.description.toUpperCase()}
				</h4>
				<h4 className="text-sm font-medium text-white/50">
					{"created by: "}
					{details?.owner}
				</h4>
			</div>
			{details?.owner === user?.username ? (
				<div className="mt-10">
					{details?.messages.length === 0 ? (
						<div className="flex flex-col items-center justify-center ">
							<p className="text-xl tracking-[.05em] font-['Mark']">you have no messages yet</p>
							<p className="text-lg">Tell your friends about it:</p>
							<div className="mt-3 flex gap-3">
								<button onClick={()=> {
									navigator.clipboard.writeText(`Send an anonymous message to ${details?.owner}. \n https://${location.pathname}`)
								}} className="flex justify-center items-center w-10 h-10 bg-[#121212] rounded-full"><TbLink fontSize={20} /></button>
								<button className="flex justify-center items-center w-10 h-10 bg-green-600 rounded-full"><a href={`whatsapp://send?text=Send an anonymous message to ${details?.owner}. \n https://${location.pathname}`}></a><TbBrandWhatsapp fontSize={20} /></button>
							</div>
						</div>
					) : (
						<div></div>
					)}
				</div>
			) : (
				<div className="mt-10 space-y-2">
				<h4 className="px-10 font-medium text-lg">send a message</h4>
					<form action="" onSubmit={(e)=> sendMessage(e)} className="flex flex-col gap-3 px-10 justify-center">
						<textarea onChange={(e)=>{
							if(e.target.value){
								setDisabled(false)
							}else{
								setDisabled(true)
							}
						}} name="" className="focus:outline-none bg-[#121212] rounded-md p-3" rows={5}></textarea>
						<button type="submit" disabled={disabled} className={`w-full p-2 rounded-full text-sm ${disabled ? 'bg-[#121212]' : 'create'} `}>send</button>
					</form>
				</div>
			)}
		</div>
	);
}
