interface InputContainerProps {
	children: React.ReactNode;
}

const InputContainer: React.FC<InputContainerProps> = ({ children }) => {
	return (
		<div className="flex flex-col w-full items-center text-xs">
			{children}
		</div>
	);
}

export default InputContainer;