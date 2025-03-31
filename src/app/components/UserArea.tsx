import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserProps {
  nickname: string;
  status: string;
  profilePhoto?: string;
	isEdited?: boolean;
}

const UserArea: React.FC<UserProps> = ({ nickname, status, profilePhoto, isEdited=true }) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [image, setImage] = useState<File | null>(null);
	const [startUpload, setStartUpload] = useState<boolean>(false);
	const [newStatus, setNewStatus] = useState<string>(status);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
      setImage(e.target.files[0]);
			setStartUpload(!startUpload);
    }
	};

	const handleUpdateProfilePhoto = async () => {
		if (!image) {
			return;
		}

		const formData = new FormData();
		formData.append("profilePhoto", image);

		try {
			const response = await fetch("/api/profilePhoto", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
			});

			if (response.ok) {
				setImage(null);
				setIsVisible(false);
				location.reload();
			}
			else {
				throw new Error("Erro ao atualizar a foto de perfil");
			}
		}
		catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		handleUpdateProfilePhoto();
	}, [startUpload]);

	const handlePressEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {	
			setIsEditable(false);

			const response = await fetch("/api/status", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("authToken")}`,					
				},
				body: JSON.stringify({ newStatus }),
			});

			if (response.ok) {
				setNewStatus("");
				setIsEditable(false);
				location.reload();
			}
		}
	};

	return (
		<div className="flex flex-col items-center bg-white w-[200px] max-h-max rounded-lg text-xs">
			<div className="flex flex-col items-center border-b-2 border-b-slate-200 w-[90%]">
				<div className="flex flex-col justify-center items-center w-full">
					{isEdited &&
						<div className="flex w-full justify-end relative">
							<span 
								onClick={toggleVisibility}
								className="relative pl-2 pr-2 shadow-md rounded-lg block hover:cursor-pointer">
								...
							</span>

							{isVisible && 
								<div className="absolute w-[150px] h-10 top-6 bg-gray-200 p-2 rounded-md">
									<input 
										id="profilePhoto" 
										type="file" 
										accept="image/*" 
										onChange={handleImageChange} 
										className="absolute hidden"/>
									<span 
										onClick={() => document.getElementById("profilePhoto")?.click()} 
										className="hover:cursor-pointer"
									>
										Alterar imagem de perfil
									</span>
								</div>
							}
						</div>
					}
					<Image
						src={profilePhoto ? profilePhoto : "/assets/user_default.png"}
						alt="Foto de perfil"
						width={100}
						height={100}
						priority
						className="rounded-full m-4"
					/>
				</div>
				<div className="flex flex-col justify-center items-center gap-4">
					<div className="font-semibold">{nickname}</div>
					<div className="font-semibold opacity-30 text-center">
						{isEditable || !status ?
							<input
								type="text"
								value={newStatus}
								placeholder="Use sua criatividade"
								onChange={(e) => setNewStatus(e.target.value)}
								onKeyDown={handlePressEnter}
								className="bg-transparent w-full h-[30px] mb-2 px-2"
							/> : 
							<div onDoubleClick={() => setIsEditable(!isEditable)}>{status}</div>
						}
					</div>
				</div>
			</div>
			<div className="p-4 border-b-2 border-slate-200 w-[90%] mb-4">
				<nav 
					className="flex flex-col pl-6 gap-4"
				>
					<Link 
						href={"/ui/profile"}
						className="flex gap-4 items-center hover:cursor-pointer max-w-max"
					>
						<Image
							src="/assets/person.ico"
							alt="icone do perfil"
							width={20}
							height={20}
							priority
						/>
						<label>Perfil</label>
					</Link>
					<Link 
						href={"/ui/feedback"}
						className="flex gap-4 items-center hover:cursor-pointer max-w-max"
					>
						<Image
							src="/assets/feedback.ico"
							alt="icone do feedback"
							width={20}
							height={20}
							priority
						/>
						<label>Feedback</label>
					</Link>
					<Link 
						href={"/ui/feedback"}
						className="flex gap-4 items-center hover:cursor-pointer max-w-max"
					>
						<Image
							src="/assets/message.ico"
							alt="icone do feedback"
							width={20}
							height={20}
							priority
						/>
						<label>Depoimentos</label>
					</Link>
				</nav>
			</div>
		</div>
	);
}

export default UserArea;