'use client';

import { profileUrl } from "@/constants/url";
import { CaretCircleDoubleDown, UserPlus, CaretCircleDoubleRight } from "@phosphor-icons/react";
import { Badge, Heading, Text, TextArea } from "@radix-ui/themes";
import { useState, ChangeEvent, FormEvent } from "react";
import { UserResponse } from "@/types/user";
import { ButtonX } from "@/components/reuse/buttons";

interface RegisterData {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default function RegisterPage() {
	const [status, setStatus] = useState(false);
	const [registerData, setRegisterData] = useState<RegisterData>({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const handleInputChange = (field: keyof RegisterData) => (e: ChangeEvent<HTMLTextAreaElement>): void => {
		setRegisterData(prev => ({
			...prev,
			[field]: e.target.value
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (registerData.password !== registerData.confirmPassword) {
			setStatus(false);
			return;
		}
		
		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: registerData.username,
					email: registerData.email,
					password: registerData.password
				})
			});
			
			if (response.status === 201) {
				const data: UserResponse = await response.json();
                console.log(data)
				setStatus(true);
				location.replace(profileUrl);
			}
		} catch (error) {
			setStatus(false);
		}
	};

	return (
		<div className="min-h-screen grid grid-cols-1 sm:grid-cols-2">
			{/* Full Screen Section with Text */}
			<section className="min-h-screen w-full items-center flex p-5">
				<div className="text-center space-y-10">
					<Heading as={'h1'} size="9" weight={'bold'}>Join Our Community! <br />Create Your Account Today</Heading>
					<Text as={'p'} color={'gray'} align={'center'}>
						Register now to access exclusive educational content and start your learning journey with us.
					</Text>
					<ButtonX
						colour="gold"
						variant="soft"
						weight="duotone"
						icon={CaretCircleDoubleDown}
						size="3"
						iconSize={28}
						className="sm:hidden flex items-center gap-2 mx-auto"
						children="swipe below"
					/>
					<ButtonX
						colour="gold"
						variant="soft"
						weight="duotone"
						icon={CaretCircleDoubleRight}
						size="3"
						iconSize={28}
						className="hidden sm:flex items-center gap-2 mx-auto"
						children="fill in your details"
					/>
				</div>
			</section>

			{/* Full Screen Section with Form */}
			<section className="min-h-screen w-full items-center flex p-5 overflow-y-auto">
				<form onSubmit={handleSubmit} className="w-full py-10">
					<h4>{status ? 'Registration successful!' : 'Please fill in your details'}</h4>
					<fieldset className="flex flex-col space-y-10 w-[90%] mx-auto">
						<legend><Badge color={'gray'} size={'3'} highContrast>Registration Details</Badge></legend>

						<div>
							<label htmlFor="username" className="text-base font-semibold">Username</label>
							<TextArea
								id="username"
								name="username"
								radius={'full'}
								placeholder="Choose your username"
								value={registerData.username}
								variant={'classic'}
								onChange={handleInputChange('username')}
								required
							/>
						</div>

						<div>
							<label htmlFor="email" className="text-base font-semibold">Email</label>
							<TextArea
								id="email"
								name="email"
								radius={'full'}
								placeholder="Enter your email"
								value={registerData.email}
								variant={'classic'}
								onChange={handleInputChange('email')}
								required
							/>
						</div>

						<div>
							<label htmlFor="password" className="text-base font-semibold">Password</label>
							<TextArea
								id="password"
								name="password"
								radius={'full'}
								placeholder="Create a password"
								value={registerData.password}
								variant={'classic'}
								onChange={handleInputChange('password')}
								required
							/>
						</div>

						<div>
							<label htmlFor="confirmPassword" className="text-base font-semibold">Confirm Password</label>
							<TextArea
								id="confirmPassword"
								name="confirmPassword"
								radius={'full'}
								placeholder="Confirm your password"
								value={registerData.confirmPassword}
								variant={'classic'}
								onChange={handleInputChange('confirmPassword')}
								required
							/>
						</div>

						<div className='w-fit mx-auto'>
							<ButtonX
								colour={'gold'}
								variant={'soft'}
								weight="duotone"
								icon={UserPlus}
								size="3"
								iconSize={28}
								children="Register"
							/>
						</div>
					</fieldset>
				</form>
			</section>
		</div>
	);
}

