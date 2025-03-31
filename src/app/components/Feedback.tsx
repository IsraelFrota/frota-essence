import traductionTerm from "../lib/traduction";

interface FeedbackProps {
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

interface DataProps {
	data: FeedbackProps;
	color: string;
	term: string;
}

const Feedback: React.FC<DataProps> = ({ data, color, term }) => {
	const date = new Date(data.date);
	const dateFormated = date.toLocaleDateString("pt-br");

	type ColorType = "Constructive" | "Corrective" | "Feedforward" | "Motivator" | "Negative" | "Personal" | "Positive";

	const dataObjectColorType: Record<ColorType, string> = {
		"Constructive": "#4A90E2",
		"Corrective": "#FF8C00",
		"Feedforward": "#50E3C2",
		"Motivator": "#FFB74D",
		"Negative": "#D0021B",
		"Personal": "#F5A7B8",
		"Positive": "#1D5C1D",
	};

	return (
		<div className={`flex flex-col p-2 w-[400px] max-h-max ${color} rounded-lg gap-2 text-xs`}>
			<p><strong  className="font-semibold">{term}</strong>: {term === "De" ? data.fromUser.nickname : data.toUser.nickname}</p>
			<p><strong>Data</strong>: {dateFormated}</p>
			<div className="border border-gray-400 opacity-30"></div>
			<p><span className="p-1 rounded-md" style={{ backgroundColor: dataObjectColorType[data.type as ColorType] }}>{traductionTerm(data.type)}</span></p>
			<p>{data.message}</p>
			{!data.response ? <div className="flex justify-end">
				<button>Responder</button>
			</div> : <></>}
			{data.response ? <p>{data.response}</p> : <></>}
			
		</div>
	);
}

export default Feedback;