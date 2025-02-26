'use client';

import { useState } from "react";
import { ButtonX } from "./buttons";
import { PaperPlaneRight } from "@phosphor-icons/react";

// interface FooterFormProps {
// 	action: string; // This can be a string URL to the form's action endpoint
//   }



export function FooterForm() {''
	const [email, setEmail] = useState('');
	const [message,setMessage] = useState('i am contacting you for a job offer..');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('email', email);
		formData.append('message', message);
		console.log(formData);
		const response = await fetch('api/contact/footer',
			{
				method: 'POST',
				body: formData
			}
		)
		if (!response) {
			
		}
	}
	return (
		<form method="POST" onSubmit={handleSubmit} className="flex flex-col space-y-4" >
			<input onChange={(e)=>setEmail(e.target.value)} type="email" name='email' className="rounded-lg p-2 focus:outline-none focus:ring-lime-700 focus:ring-2" placeholder="john@email.com" required />
			<textarea onChange={(e)=>setMessage(e.target.value)} name="message" className="rounded-xl p-2 focus:outline-none focus:ring-lime-700 focus:ring-2" rows={3} required >
			</textarea>
			<ButtonX colour={"gold"} variant={"surface"} weight={'duotone'} children={`Submit`} icon={PaperPlaneRight} type={'submit'} />
		</form>
	)
}

