const UserArea: React.FC = () => {
	return (
		<div className="bg-white rounded-lg shadow-lg p-4 w-[200px]">
			<div className="relative flex flex-col justify-center items-center">
				{/* Logo */}
				<img 
					className="rounded-lg mb-4"
					src="/download.jpeg" 
					alt="Logo principal" 
					aria-label="Logo principal"
				/>
				
				{/* Imagem do usuário */}
				<img 
					className="absolute top-[49%] transform -translate-y-1/2 rounded-full border-4 border-transparent"
					src="/RICARDO.png" 
					alt="Imagem de Ricardo"
					width={100}
					height={100}
					aria-label="Foto do usuário, Ricardo"
				/>

				{/* Nome / Nickname */}
				<p 
					className="text-xl font-semibold text-center mb-2 w-[80%] border-b-2 border-b-[#fba91f]"
				>
					Nickname
				</p>

				{/* Descrição */}
				<span className="text-gray-600 text-sm text-center">
					Descrição com um pouco de detalhe
				</span>
			</div>
		</div>
	);
}

export default UserArea;