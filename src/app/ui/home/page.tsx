"use client";

import Event from "@/app/components/Event";
import Header from "@/app/components/Header";
import Mural from "@/app/components/Mural";
import UserArea from "@/app/components/UserArea";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";

const HomePage: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("authToken");

		if (!token) {
			router.replace("/");
		}
		else {
			setIsLoading(false);
		}

	}, []);

	return (
		<div className="flex flex-col items-center pt-4">
			{isLoading && <Loading />}
			{!isLoading &&
			<>
				<Header />

				<div className="w-[80%] flex justify-between">
					<div>
						<UserArea />
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