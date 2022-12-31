import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoom } from "../api";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";
import { TbLink, TbBrandWhatsapp, TbRefresh } from "react-icons/tb";
import { sendMessage } from "../api";
import Loader from "./Loader";

export default function () {
	const initialState = { text: "", date: Date.now() };
	const [message, setMessage]: any = useState(initialState);
	const location = useLocation();
	const { id, username } = useParams();
	const [details, setDetails]: any = useState(null);
	const user = useRecoilValue(userState);
	const [disabled, setDisabled] = useState(true);
	const [loader, setLoader] = useState(true);
	const [sendStatus, setStatus]: any = useState(null)

	const fetchDetails = async () => {
			setLoader(true);
			const response = await getRoom({ id, username });
			setDetails(response.data);
			setTimeout(()=> setLoader(false), 2000)
	};
	async function handleSubmit(e: any) {
		e.preventDefault();

		try {
			setLoader(true);
			const response = await sendMessage({ username, id, message });
			setMessage(initialState)
			setStatus("success")
			setTimeout(()=> setLoader(false), 2000)
		} catch (err) {
			setLoader(false);
			console.log(err);
		}
	}
	useEffect(() => {
		fetchDetails();
	}, []);
	console.log(details);

	return loader ? (
		<Loader />
	) : (
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
					<div className="font-semibold text-2xl mb-5 flex items-center">
						<h4>your messages</h4>
						<button className="ml-auto" onClick={()=> fetchDetails()}><TbRefresh fontSize={30} /></button>
					</div>
					{details?.messages.length === 0 ? (
						<div className="flex flex-col items-center justify-center ">
							<p className="text-xl tracking-[.05em] font-['Mark']">
								you have no messages yet
							</p>
							<p className="text-lg">
								Tell your friends about it:
							</p>
							<div className="mt-3 flex gap-3">
								<button
									onClick={() => {
										navigator.clipboard.writeText(
											`Send an anonymous message to ${details?.owner}. \n https://${location.pathname}`
										);
									}}
									className="flex justify-center items-center w-10 h-10 bg-[#121212] rounded-full"
								>
									<TbLink fontSize={20} />
								</button>
								<button className="flex justify-center items-center w-10 h-10 bg-green-600 rounded-full">
									<a
										href={`whatsapp://send?text=Send an anonymous message to ${details?.owner}. \n https://${location.pathname}`}
									></a>
									<TbBrandWhatsapp fontSize={20} />
								</button>
							</div>
						</div>
					) : (
						<div className="flex flex-col px-5 gap-7">
							{details?.messages?.map((item: any) => {
								return (
									<div className="w-full border-2 space-y-3 text-sm border-white p-5 rounded-md ">
										<p>{item.text}</p>
										<h4 className="text-xs text-indigo-400">
											{new Date(
												item.date
											).toLocaleString()}
										</h4>
									</div>
								);
							})}
						</div>
					)}
				</div>
			) : (
				<div className="mt-10 space-y-2">
					<h4 className="px-10 font-medium text-lg">
						send a message
					</h4>
					<form
						action=""
						onSubmit={(e) => handleSubmit(e)}
						className="flex flex-col gap-3 px-10 justify-center"
					>
						<textarea
							onChange={(e) => {
								if (e.target.value) {
									setDisabled(false);
								} else {
									setDisabled(true);
								}
								setMessage({
									...message,
									text: e.target.value,
								});
							}}
							name=""
							className="focus:outline-none bg-[#121212] rounded-md p-3"
							rows={5}
						></textarea>
						<button
							type="submit"
							disabled={disabled}
							className={`w-full p-2 rounded-full text-sm ${
								disabled ? "bg-[#121212]" : "create"
							} `}
						>
							send
						</button>
					</form>
					{sendStatus === "success" && <div className=""><h4 className="text-green-400"> Message sent</h4></div>}
				</div>
			)}
		</div>
	);
}
