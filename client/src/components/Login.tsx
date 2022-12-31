import { useState, useEffect } from "react";
import {
	TbUser,
	TbLock,
	TbArrowNarrowRight,
	TbEye,
	TbEyeOff,
} from "react-icons/tb";
import { signUp, signIn } from "../api";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";

const Login = () => {
	const navigate = useNavigate();
	const [state, setState] = useState("Sign Up");
	const [showPass, setShow] = useState(false);
	const password = showPass ? "text" : "password";
	const initial = { username: "", password: "" };
	const [details, setDetails]: any = useState(initial);

	function resetState(e: any) {
		e.preventDefault();
		if (state === "Sign Up") {
			setState("Sign In");
		} else {
			setState("Sign Up");
		}
	}

	const handleChange = (e: any) => {
		setDetails({ ...details, [e.target.name]: e.target.value });
	};

	const [user, setUser] = useRecoilState(userState);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			if (state === "Sign Up") {
				const { data } = await signUp(details);
				await localStorage.setItem("profile", JSON.stringify(data));
			} else {
				const { data } = await signIn(details);
				await localStorage.setItem("profile", JSON.stringify(data));
			}
			//@ts-ignore
			setUser(JSON.parse(localStorage.getItem("profile")));
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if (user?.username) {
			navigate("/dashboard", { replace: true });
		}
	}, [user]);

	return (
		<div className="text-gray-300 h-full flex mt-16 justify-center items-center">
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="p-5 flex-col items-center gap-5 flex rounded-lg"
			>
				<h4 className="font-semibold text-2xl font-['Barlow_Condensed'] tracking-[.15rem]">
					{state.toUpperCase()}
				</h4>
				<div className="flex items-center gap-2">
					<TbUser className="text-white" fontSize={20} />
					<input
						name="username"
						value={details.username}
						onChange={(e) => handleChange(e)}
						type="text"
						className="bg-black py-2 p-5  rounded-3xl focus:outline-none"
						placeholder="username"
					/>
				</div>
				<div className="flex items-center relative gap-2">
					<TbLock fontSize={20} />
					<input
						name="password"
						value={details.password}
						onChange={(e) => handleChange(e)}
						type={password}
						className="bg-black rounded-3xl focus:outline-none py-2 p-5"
						placeholder="password"
					/>
					<span
						className="absolute right-3 cursor-pointer"
						onClick={() => setShow(!showPass)}
					>
						{!showPass ? <TbEye /> : <TbEyeOff />}
					</span>
				</div>
				{state === "Sign Up" && (
					<div className="flex items-center relative gap-2">
						<TbLock fontSize={20} />
						{state === "Sign Up" && (
							<input
								type={password}
								className="bg-black rounded-3xl focus:outline-none py-2 p-5"
								placeholder="confirm password"
							/>
						)}
						<span
							className="absolute right-3 cursor-pointer"
							onClick={() => setShow(!showPass)}
						>
							{!showPass ? <TbEye /> : <TbEyeOff />}
						</span>
					</div>
				)}
				<div className="text-sm">
					{state === "Sign Up"
						? "Already have an account? "
						: "Don't have an account? "}{" "}
					<button
						className="text-white/25 font-medium changebtn relative pb-1"
						onClick={(e) => resetState(e)}
					>
						{state === "Sign Up" ? "sign in" : "sign up"}
					</button>
				</div>
				<div className="flex w-full items-center">
					<div className="flex gap-2 font-['Barlow_Condensed'] tracking-[.15rem] items-center text-sm">
						<div className="relative cursor-pointer check_container">
							<input type="checkbox" className="checkbox" />
							<span className="checkmark"></span>
						</div>
						<h4>REMEMBER</h4>
					</div>
					<button
						type="submit"
						className=" ml-auto p-2 text-sm pr-3 font-medium px-5 rounded-3xl bg-white text-black tracking-[.15rem] flex items-center gap-2 font-['Barlow_Condensed']"
					>
						{state.toUpperCase()}{" "}
						<TbArrowNarrowRight fontSize={20} />
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
