import { useEffect, useState } from "react";

import Feedback from "./Feedback";

interface FeedbackData {
	id: Number;
	type: string;
	message: string;
	response: string;
	date: Date;
	fromUser: {
		nickname: string;
	};
	toUser: {
		nickname: string;
	}
}

const FeedbackReceived: React.FC = () => {
	const [feedback, setFeedback] = useState<FeedbackData[]>([]);

	useEffect(() => {
		const getFeedback = async () => {
			const response = await fetch("/api/feedback/received", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("authToken")}`,
				}
			});

			const data = await response.json();
			if (response.ok) {
				setFeedback(data);
			}
			else {
				console.error(data);
			}
		}

		getFeedback();
	}, []);
	
	return (
		<>
			{feedback.map((feed, index) => (
				<Feedback data={feed} color={"bg-blue-100"} term={"De"} key={index} />
			))}
		</>
	);
}

export default FeedbackReceived;