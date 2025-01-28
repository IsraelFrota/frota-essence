interface InputProps {
	typeInput: string;
	placeholderInput: string;
	valueInput: string;
	handleSetValueInput: (value: string) => void; 
}

const Input: React.FC<InputProps> = ({ 
	typeInput, 
	placeholderInput,
	valueInput,
	handleSetValueInput
}) => {
	return (
		<input
			className="md:w-1/2 w-4/5 h-10 p-2 border-b-2 focus:outline-none focus:border-b-[#fba91f] font-semibold text-lg"
			type={typeInput}
			placeholder={placeholderInput}
			value={valueInput}
			onChange={(e) => handleSetValueInput(e.target.value)} 
		/>
	);
}

export default Input;