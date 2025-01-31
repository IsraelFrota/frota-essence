"use cliente";

import Image from "next/image";
import Reaction from "./Reaction";
import { useEffect, useState } from "react";
import Comment from "./Comment";

interface User {
  id: number;
  nickname: string;
}

interface Comments {
	id: number;
	userId: number;
	postId: number;
	message: string;
	createdAt: Date;
	user: User;
}

interface Reactions {
	id: number;
  userId: number;
  postId: number;
  type: string;
  createdAt: Date;
  user: User;
}

interface DataPost {
	id: number;
	userId: number;
	user: User;
	content: string;
	file: string | null;
	type: string;
	createdAt: Date;
	updatedAt: Date;
	reactions: Reactions[];
	comments: Comments[];
}

interface PostProps {
	data: DataPost;
}

const Post: React.FC<PostProps> = ({ data }) => {
	const [hourPublication, setHourPublication] = useState<string>("");
	const [datePublication, steDatePublication] = useState<string>("");

	useEffect(() => {
		setHourPublication(new Date(data.updatedAt).toLocaleTimeString("pt-BR"));
		steDatePublication(new Date(data.updatedAt).toLocaleDateString("pt-BR"));
	}, []);

	return (
		<div className="flex justify-center mt-6">
			<div className="flex flex-col justify-center items-center gap-2 p-2 w-[500px] max-h-max border rounded-lg">
				
				<div className="flex items-center w-[450px] gap-2">	
					<div className="w-12 h-12 rounded-full">
						<Image
							className="rounded-full"
							src={"/RICARDO.png"}
							alt="user image"
							width={48}
							height={48}
						/>
					</div>
					<div>
						<p className="font-semibold">{data.user.nickname}</p>
						<span className="font-semibold text-gray-500 text-sm">{hourPublication} {datePublication}</span>
					</div>
				</div>
				
				<div className=" w-[450px]">
					<p>{data.content}</p>
				</div>
				
				{data.file ? 
					<Image
						className="rounded-lg"
						src={`${data.file}`}
						alt=""
						width={450}
						height={450}
						priority
					/> : 
					<></>
				} 

				<div className="flex justify-between items-center w-[450px] h-[30px]">
					<div className="flex justify-center w-[150px]">
						<Reaction postId={data.id} numberReaction={data.reactions.length} />
					</div>
					
					<div className="flex justify-center w-[150px]">
						<Comment commentsData={data.comments} />
					</div>
				</div>

			</div>
		</div>
	);
}

export default Post;