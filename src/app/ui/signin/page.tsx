"use client";

import Image from "next/image";
import Input from "../../components/Input";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import InputContainer from "@/app/components/InputContainer";
import InputPassword from "@/app/components/InputPassword";

const formSchema = z.object({
	email: z.string().email().min(1, { message: "O e-mail é obrigatório" }),
	password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type FormDataType = z.infer<typeof formSchema>;

const Signin: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
		password: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key:string]: { message: string } }>({});
  const [formSubmitError, setFormSubmitError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const parseFormData = formSchema.safeParse(formData);

      if (!parseFormData.success) {
				const errors: { [key: string]: { message: string} } = {};
				
				parseFormData.error.errors.forEach((error) => {
					if (error.path[0]) {
						const fieldName = error.path[0].toString();
						errors[fieldName] = { message: error.message };
					}
				});
	
				setFormErrors(errors);
				return;
			}

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parseFormData.data),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("authToken", data.jwtToken);
        setFormData({
          email: "",
		      password: "",
        });
        setFormErrors({});
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

  const updateField = (field: keyof FormDataType) => (value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className="bg-gradient-to-br from-[#fba91f] to-[#202020] h-screen w-screen flex justify-center items-center">
      <div className="bg-[#202020] opacity-80 md:w-[600px] w-[300px] md:h-[500px] h-[400px] rounded-md rotate-6"></div>

      <form 
        onSubmit={handleSubmit}  
        className="absolute bg-white md:w-[600px] w-[300px] md:h-[500px] h-[400px] rounded-md"
      >
        <div className="flex flex-col w-full h-full md:gap-4 gap-2 justify-center items-center text-xs">
          <Image
            src={"/logo.svg"}
            alt="Logo da empresa"
            width={250}
            height={150}
            priority
          />
          <InputContainer>
            <Input 
              typeInput="email" 
              placeholderInput="Email de acesso"
              valueInput={formData.email}
              handleSetValueInput={updateField("email")}
            />
            {formErrors.email && <div className="font-semibold text-red-600">{formErrors.email.message}</div>}
          </InputContainer>
          <InputContainer>
            <InputPassword
              placeholderInput="Sua senha"
              valueInput={formData.password}
              handleSetValueInput={updateField("password")}
            />
            {formErrors.password && <div className="font-semibold text-red-600 text-xs">{formErrors.password.message}</div>}
          </InputContainer>
          <button
            className="bg-[#202020] md:w-1/2 w-4/5 h-8 rounded-md text-white font-semibold"
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