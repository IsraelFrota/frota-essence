import { useState } from "react";
import Image from "next/image";

interface InputPasswordProps {
	valueInput: string;
	placeholderInput: string;
	handleSetValueInput: (value: string) => void;
}

const InputPassword: React.FC<InputPasswordProps> = ({ valueInput, placeholderInput, handleSetValueInput }) => {
	const [typeInput, setTypeInput] = useState<string>("password");

	const handleChangeTypeInput = () => {
		setTypeInput((currentType) => currentType === "password" ? "text" : "password");
	};

	return (
		<div className="flex border-b-2 focus-within:border-[#fba91f] md:w-1/2 w-4/5 h-10 font-semibold text-md">
			<input 
				type={typeInput} 
				placeholder={placeholderInput}
				value={valueInput}
				onChange={(e) => handleSetValueInput(e.target.value)}
				className="w-full bg-transparent p-2 focus:outline-none md:text-md text-xs"
			/>
			<button
				type="button"
				onClick={handleChangeTypeInput}
			>
				{typeInput === "password" ?
					<Image src="/assets/eye_show.ico" alt="Mostrar senha" width={20} height={20} priority /> :
					<Image src="/assets/hidden_show.ico" alt="Esconder senha" width={20} height={20} priority />
				}
			</button>
		</div>
	);
}

export default InputPassword;