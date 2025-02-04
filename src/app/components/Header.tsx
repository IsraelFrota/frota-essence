import Image from "next/image";
import Link from "next/link";

interface UserInfor {
	fullName: string;
	profilePhoto: string;
}

const Header: React.FC<UserInfor> = ({ fullName, profilePhoto }) => {
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
				<nav className="flex justify-between items-center w-[200px] gap-10 pl-6">
					<Link href={"/ui/home"} className="hover:text-[#fba91f]">Inicio</Link>
					<Link href={"/ui/profile"} className="hover:text-[#fba91f]">Perfil</Link>
					<Link href={"/ui/feedback"} className="hover:text-[#fba91f]">Feedback</Link>
					<Link href={"/ui/brief"} className="hover:text-[#fba91f]">Depoimentos</Link>
					<Link href={"/ui/community"} className="hover:text-[#fba91f]">Comunidades</Link>
				</nav>
			</div>
			<div className="flex justify-between gap-6">
				<div className="flex justify-between">
					<input 
						className="w-4/5 pl-2 border-b-2 h-10 focus:outline-none focus:border-b-[#fba91f] font-semibold"
						type="text" 
						placeholder="Buscar"
					/>
					<button className="hover:cursor-pointer">
						<Image
							src="/assets/search.ico"
							alt="icone de pesquisa"
							width={20}
							height={20}
							priority
						/>
					</button>
				</div>

				<div className="flex items-center gap-2">
					<div className="w-[40px] h-[40px] rounded-full border-2 border-orange-500">
						{profilePhoto ? 
							<Image
								src={profilePhoto}
								alt="Foto do perfil do usuario"
								width={37}
								height={37}
								priority
								className="rounded-full"
							/> : <></>
						}
					</div>
					<div>{fullName ? fullName: "Nome completo"}</div>
				</div>
			</div>
		</div>
	);
}

export default Header;