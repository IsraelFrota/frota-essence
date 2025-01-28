"use client";

import Input from "@/app/components/Input";
import InputContainer from "@/app/components/InputContainer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().min(1, { message: "Email é obrigatório." }).email().toLowerCase(),
	password: z.string().min(6, { message: "Senha é obrigatório." })
});

type formLoginDataType = z.infer<typeof formSchema>;

interface SigninProps {
	handleSwapForm: () => void;
}

const Signin: React.FC<SigninProps> = ({ handleSwapForm }) => {
	const [formLoginData, setFormLoginData] = useState<formLoginDataType>({
		email: "",
		password: "",
	});
	const [formLoginDataErrors, setFormLoginDataErrors] = useState<{ [key: string]: { message: string } }>({});
	const [formSubmitError, setFormSubmitError] = useState<string>("");
	const router = useRouter();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const parseFormData = formSchema.safeParse(formLoginData);

			if (!parseFormData.success) {
				const errors: { [key: string]: { message: string } } = {};

				parseFormData.error.errors.forEach((error) => {
					if (error.path[0]) {
						const fieldName = error.path[0].toString();
						errors[fieldName] = { message: error.message };
					}
				});

				setFormLoginDataErrors(errors);
				return;
			}

			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(parseFormData.data),
			});

			const data = await response.json();

			if (response.ok) {
				localStorage.setItem("authToken", data.token);
				setFormLoginData({
					email: "",
					password: "",
				});
				setFormLoginDataErrors({});
				setFormSubmitError("");
				router.replace("/ui/home");
			}
			else {
				setFormSubmitError(data.error);
			}
		}
		catch (error) {
			console.error(error);
		}
	};

	const updateField = (field: keyof formLoginDataType) => (value: string) => {
		setFormLoginData((prevData) => ({ ...prevData, [field]: value }));
	};
	
	return (
		<div className="bg-gradient-to-br from-[#fba91f] to-[#202020] h-screen w-screen flex justify-center items-center">
      <div className="bg-[#202020] opacity-80 md:w-[600px] w-[300px] md:h-[500px] h-[400px] rounded-md rotate-6"></div>

			<form 
        onSubmit={handleSubmit}  
        className="absolute bg-white md:w-[600px] w-[300px] md:h-[500px] h-[400px] rounded-md"
      >	
				<div className="flex flex-col w-full h-full gap-10 justify-center items-center pb-24">
					<InputContainer>
						<Image 
							src="/logo.svg"
							alt="logo da empresa Israel Frota"
							width={300}
							height={100}
							priority
						/>
					</InputContainer>
					<InputContainer>
						<Input
							typeInput="email"
							placeholderInput="exemplo@email.com"
							valueInput={formLoginData.email}
							handleSetValueInput={updateField("email")}
						/>
						{formLoginDataErrors.email && <div className="font-semibold text-red-600">{formLoginDataErrors.email.message}</div>}
					</InputContainer>
					<InputContainer>
						<Input 
							typeInput="password"
							placeholderInput="********"
							valueInput={formLoginData.password}
							handleSetValueInput={updateField("password")}
						/>
						{formLoginDataErrors.password && <div className="font-semibold text-red-600">{formLoginDataErrors.password.message}</div>}
					</InputContainer>
					<span>Você não tem uma conta? <button className="text-blue-600 hover:scale-105" onClick={handleSwapForm}>Crie aqui.</button></span>
          <button
            className="bg-[#202020] md:w-1/2 w-4/5 h-10 rounded-md text-white font-semibold text-base"
          >
            Entrar
          </button>
          {formSubmitError && <div className="font-semibold text-red-600">{formSubmitError}</div>}
				</div>
			</form>
		</div>
	);
}

export default Signin;