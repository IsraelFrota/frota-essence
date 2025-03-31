import { useEffect, useState } from "react";

import Feedback from "./Feedback";

interface FeedbackData {
	id: number;
	type: string;
	message: string;
	response: string;
	date: Date;
	fromUser: {
		nickname: string;
	};
	toUser: {
		nickname: string;
	};
}

const FeedbackSent: React.FC = () => {
	const [feedback, setFeedback] = useState<FeedbackData[]>([]);

	useEffect(() => {
		const getFeedback = async () => {
			const response = await fetch("/api/feedback/sent", {
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
				<Feedback data={feed} color={"bg-green-100"} term={"Para"} key={index} />
			))}
		</>
	);
}

export default FeedbackSent;