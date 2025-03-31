import traductionTerm from "../lib/traduction";

interface StatisticProps {
	_count: {
		type: number;
	},
	type: string;
}

interface BarChartProps {
	data: StatisticProps[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
	const maxValue = Math.max(...data.map(item => item._count.type));

	return (
		<div className="flex justify-center gap-4 items-end w-[400px] h-[200px] border-b mt-6">
			{data.map((values, index) => (
				<div 
					key={index} 
					className="relative bg-orange-400 w-10 inline-block rounded-t-md group"
					style={{
						height: `${(values._count.type / maxValue) * 100}%`
					}}
				>
					{/* Balão de texto que aparece ao passar o mouse */}
					<span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						{traductionTerm(values.type)}
					</span>

					{/* Texto do valor na base da barra */}
					<span className="absolute bottom-0 w-full text-center text-xs">{values._count.type}</span>
				</div>
			))}
		</div>
	);
}

export default BarChart;
