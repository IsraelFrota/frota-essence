"use client";

import Event from "@/app/components/Event";
import Header from "@/app/components/Header";
import Mural from "@/app/components/Mural";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import UserArea from "@/app/components/UserArea";

interface UserInfor {
	id: number;
  fullName: string;
  nickname: string;
  email: string;      
  position: string;
  department: string;
	status: string;
  profilePhoto: string;
}

const HomePage: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const router = useRouter();
	const [userData, setUserData] = useState<UserInfor>({
		id: -1,
		fullName: "",
		nickname: "",
		email: ""      ,
		position: "",
		department: "",
		status: "",
		profilePhoto: "",
	});

	const handleGetUser = async () => {
		try {
			const response = await fetch("/api/auth/me", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("authToken")}`,
				}
			});

			const data = await response.json();
			if (response.ok) {
				setUserData(data.user);
			}
		}
		catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("authToken");

		if (!token) {
			router.replace("/");
		}
		else {
			handleGetUser();
			setIsLoading(false);
		}
	}, []);

	return (
		<div className="flex flex-col items-center pt-4">
			{isLoading && <Loading />}
			{!isLoading &&
			<>
				<Header fullName={userData.fullName} profilePhoto={userData.profilePhoto} />

				<div className="w-[80%] flex justify-between text-xs">
					<div>
						<UserArea 
							nickname={userData.nickname} 
							status={userData.status} 
							profilePhoto={userData.profilePhoto} 
							isEdited={false}
						/>
					</div>
					
					<div>
						<Mural />
					</div>

					<div>
						<Event />
					</div>
				</div>
			</>
			}
		</div>
	);
}

export default HomePage;