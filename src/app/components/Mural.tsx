import Post from "./Post";

import { useEffect, useState } from "react";

const Mural: React.FC = () => {
	const [posts, setPosts] = useState([]);

	const getPost = async () => {
		try {
			const response = await fetch("/api/post", {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!response.ok) {
				return;
			}

			const post = await response.json();

			setPosts(post);
		}	
		catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPost();
	}, []);

	return (
		<div className="bg-white max-h-max w-[630px] rounded-lg p-4">

			<div className="text-5xl font-semibold mb-4">
				Bem vindo(a)
			</div>

			<div>
				<input 
					type="text" 
					placeholder="Faça uma publicação para contribuir com alguem hoje." 
					className="border-b p-2 w-full focus:outline-none focus:border-b-[#fba91f]" 
				/>
				<div className="flex justify-between items-center">

					<div className="relative pt-4">
						{/* Input de arquivo escondido */}
						<input 
							id="fileInput"
							className="absolute hidden" 
							type="file"
							accept="image/*" 
							//onChange={handleImageChange}
						/>
						<span 
							onClick={() => document.getElementById("fileInput")?.click()}
							className="cursor-pointer material-symbols-outlined ">
							attach_file
						</span>
					</div>
					
					<div className="flex justify-between w-48 mt-4">
						<button className="bg-slate-500 text-white px-4 h-10 rounded-md">
							Publicar
						</button>
						<button className="bg-slate-500 text-white px-4 h-10 rounded-md">
							Cancelar
						</button>
					</div>
				</div>
			</div>

			{posts.map((post, index) => (
				<Post key={index} data={post} />
			))}
			

		</div>
	);
}

export default Mural;