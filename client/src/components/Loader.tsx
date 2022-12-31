import {HashLoader} from 'react-spinners'

export default function (){
	return (
		<div className="fixed h-full flex justify-center items-center top-0 bottom-0 left-0 right-0">
			<div className="absolute top-0 bottom-0 left-0 right-0 h-full bg-[#121212]/75" />
			<HashLoader color="#fff" />
		</div>
	)
}