"use client";

import Event from "@/app/components/Event";
import Header from "@/app/components/Header";
import Mural from "@/app/components/Mural";
import UserArea from "@/app/components/UserArea";

const HomePage: React.FC = () => {
	
	return (
		<div className="flex flex-col items-center pt-4">
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
		</div>
	);
}

export default HomePage;