"use client";

import Input from "@/app/components/Input";
import InputContainer from "@/app/components/InputContainer";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";

const formSchema = z.object({
	fullName: z.string().min(1, { message: "Nome é obrigatório." }).toLowerCase(),
	nickname: z.string().min(1, { message: "Nome de usuário é obrigatório." }),
	email: z.string().min(1, { message: "Email é obrigatório." }).email().toLowerCase(),
	password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres." }),
	position: z.string().min(1, { message: "Cargo/Função é obrigatório." }),
	department: z.string().min(1, { message: "Departamento é obrigatório." }),
	roleId: z.string().min(1, { message: "Selecione um tipo de usuário." })
});

type formDataRegisterType = z.infer<typeof formSchema>;

const Signup: React.FC = () => {
	const [formDataRegister, setFormDataRegister] = useState<formDataRegisterType>({
		fullName: "",
		nickname: "",
		email: "",
		password: "",
		position: "",
		department: "",
		roleId: "",
	});
	const [formDataRegisterErrors, setFormDataRegisterErrors] = useState<{ [key: string]: { message: string } }>({});
	const [formSubmitError, setFormSubmitError] = useState<string>("");

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		
		try {
			const parseFormData = formSchema.safeParse(formDataRegister);

			if (!parseFormData.success) {
				const errors: { [key: string]: { message: string } } = {};

				parseFormData.error.errors.forEach((error) => {
					if (error.path[0]) {
						const fieldName = error.path[0].toString();
						errors[fieldName] = { message: error.message };
					}
				});

				setFormDataRegisterErrors(errors);
				return;
			}

			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(parseFormData.data),
			});
			
			const data = await response.json();

			if (response.ok) {
				localStorage.setItem("authToken", data.token);
				setFormDataRegister({
					fullName: "",
					nickname: "",
					email: "",
					password: "",
					position: "",
					department: "",
					roleId: "",
				});
				setFormDataRegisterErrors({});
				setFormSubmitError("");
			}
			else {
				setFormSubmitError(data.error);
			}
		}
		catch (error) {
			console.error(error);
		}
	};

	const updateField = (field: keyof formDataRegisterType) => (value: string) => {
		setFormDataRegister((prevData) => ({ ...prevData, [field]: value }));
	};
	
	return (
		<div className="bg-gradient-to-br from-[#fba91f] to-[#202020] h-auto flex justify-center items-center pt-6 pb-6 overflow-x-hidden">
      <form 
				onSubmit={handleSubmit}
				className="bg-[#FFFFFF] md:w-[600px] w-[300px] h-auto rounded-md"
			>
				<div className="flex flex-col gap-6 pt-4 pb-[62px]">
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
							typeInput="text"
							placeholderInput="Nome completo"
							valueInput={formDataRegister.fullName}
							handleSetValueInput={updateField("fullName")}
						/>
						{formDataRegisterErrors.fullName && <div className="font-semibold text-red-600">{formDataRegisterErrors.fullName.message}</div>}
					</InputContainer>
					<InputContainer>
						<Input 
							typeInput="text"
							placeholderInput="Nome de usuário"
							valueInput={formDataRegister.nickname}
							handleSetValueInput={updateField("nickname")}
						/>
						{formDataRegisterErrors.nickname && <div className="font-semibold text-red-600">{formDataRegisterErrors.nickname.message}</div>}
					</InputContainer>
					<InputContainer>
						<Input 
							typeInput="email"
							placeholderInput="Seu email"
							valueInput={formDataRegister.email}
							handleSetValueInput={updateField("email")}
						/>
						{formDataRegisterErrors.email && <div className="font-semibold text-red-600">{formDataRegisterErrors.email.message}</div>}
					</InputContainer>
					<InputContainer>
						<Input 
							typeInput="password"
							placeholderInput="Sua senha"
							valueInput={formDataRegister.password}
							handleSetValueInput={updateField("password")}
						/>
						{formDataRegisterErrors.password && <div className="font-semibold text-red-600">{formDataRegisterErrors.password.message}</div>}
					</InputContainer>
					<InputContainer>
						<label>
							Tipo de usuário
						</label>
						<select 
							onChange={(e) => updateField("roleId")(e.target.value)}
							name="typeUser"
							className="mt-2 w-[30%] border rounded-md p-2 bg-transparent focus:outline-none selection:bg-transparent"
						>
							<option value="1">Administrador</option>
							<option value="2">Gerente</option>
							<option value="3">Comum</option>
						</select>
						{formDataRegisterErrors.roleId && <div className="font-semibold text-red-600">{formDataRegisterErrors.roleId.message}</div>}
					</InputContainer>
					<InputContainer>
						<Input 
							typeInput="text"
							placeholderInput="Sua função"
							valueInput={formDataRegister.position}
							handleSetValueInput={updateField("position")}
						/>
						{formDataRegisterErrors.position && <div className="font-semibold text-red-600">{formDataRegisterErrors.position.message}</div>}
					</InputContainer>
					<InputContainer>
						<Input 
							typeInput="text"
							placeholderInput="Seu departamento"
							valueInput={formDataRegister.department}
							handleSetValueInput={updateField("department")}
						/>
						{formDataRegisterErrors.department && <div className="font-semibold text-red-600">{formDataRegisterErrors.department.message}</div>}
					</InputContainer>
					<InputContainer>
						<button
							className="bg-[#202020] md:w-1/2 w-4/5 h-10 rounded-md text-white font-semibold text-base"
						>
							Registrar
						</button>
						{formSubmitError && <div className="font-semibold text-red-600">{formSubmitError}</div>}
					</InputContainer>
				</div>
			</form>
		</div>
	);
}

export default Signup;