import Image from "next/image";
import Post from "./Post";

import { useEffect, useState } from "react";

const Mural: React.FC = () => {
	const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handlePublishPost = async () => {
    if (!newPostText.trim()) {
      return;
    }
    
    const formData = new FormData();
    
    formData.append("content", newPostText);
    formData.append("type", "text");
    
    if (image) {
      formData.append("file", image);
    }

    setNewPostText("");
    setImage(null);

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });
      
      if (response.ok) {
        setNewPostText("");
        setImage(null);
        getPost();
				location.reload();
      } 
      else {
        throw new Error("Erro ao publicar o post");
      }
    }
    catch (error) {
      console.error(error);
    }
  };

	return (
		<div className="bg-white max-h-max w-[630px] rounded-lg p-4 text-xs">

			<div className="text-5xl font-semibold mb-4">
				Bem vindo(a)
			</div>

			<div>
				<textarea 
					value={newPostText} 
					onChange={(e) => setNewPostText(e.target.value)}
					placeholder="Faça uma publicação para contribuir com alguem hoje." 
          className="flex border-b p-2 w-full h-auto focus:outline-none focus:border-b-[#fba91f]" 
				/>

				<div className="flex justify-between items-center">

					<div className="relative pt-4">
						{/* Input de arquivo escondido */}
						<input 
							id="fileInput"
							className="absolute hidden" 
							type="file"
							accept="image/*" 
							onChange={handleImageChange}
						/>
						<span 
							onClick={() => document.getElementById("fileInput")?.click()}
							className="hover:cursor-pointer"
						>
							<Image 
								src={"/assets/paper_clip.ico"}
								alt="icone para anexar imagens"
								width={20}
								height={20}
								priority
							/>
						</span>
					</div>
					
					<div className="flex justify-between w-30 mt-4 text-xs">
						<button 
              className="hover:text-[#fba91f] px-4"
              onClick={handlePublishPost}
            >
							Publicar
						</button>
						<button 
              className="hover:text-[#fba91f] px-4"
              onClick={() => setNewPostText("")}
            >
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