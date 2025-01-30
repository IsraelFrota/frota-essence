import Image from "next/image";

const Header: React.FC = () => {
	return (
		<div className="flex justify-between items-center w-[80%] bg-white pl-4 pr-4 mb-4 rounded-lg">
			<div className="flex">
				<Image 
					src="/logo.svg"
					alt="logo da empresa Israel Frota"
					width={100}
					height={100}
					priority
				/>
				<nav className="flex justify-between items-center w-[200px] text-white">
					<button className="px-4 h-10 bg-slate-500 rounded-md">Home</button>
					<button className="px-4 h-10 bg-slate-500 rounded-md">Perfil</button>
					<button className="px-4 h-10 bg-slate-500 rounded-md">Feedback</button>
				</nav>
			</div>
			<div className="flex justify-between">
				<input 
					className="md:w-2/3 w-4/5 pl-2 border-b-2 h-10 focus:outline-none focus:border-b-[#fba91f] font-semibold"
					type="text" 
					placeholder="Buscar"
				/>
				<button className="bg-slate-500 text-white px-4 h-10 rounded-md">Buscar</button>
			</div>
		</div>
	);
}

export default Header;