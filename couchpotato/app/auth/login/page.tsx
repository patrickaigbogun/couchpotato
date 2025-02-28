'use client';

import { profileUrl } from "@/constants/url";
import { CaretCircleDoubleDown, SignIn, CaretCircleDoubleRight } from "@phosphor-icons/react";
import { Badge, Heading, Text, TextArea } from "@radix-ui/themes";
import { useState, ChangeEvent, FormEvent } from "react";
import { UserResponse } from "@/types/user";
import { ButtonX } from "@/components/reuse/buttons";

interface LoginData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const [status, setStatus] = useState(false);
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: ''
    });

    const handleInputChange = (field: keyof LoginData) => (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setLoginData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            
            if (response.status === 200) {
                const data: UserResponse = await response.json();
                console.log(data);
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
                    <Heading as={'h1'} size="9" weight={'bold'}>Welcome Back! <br />Sign In to Your Account</Heading>
                    <Text as={'p'} color={'gray'} align={'center'}>
                        Log in to access your personalized learning experience and continue your educational journey.
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
                        children="enter your credentials"
                    />
                </div>
            </section>

            {/* Full Screen Section with Form */}
            <section className="min-h-screen w-full items-center flex p-5 overflow-y-auto">
                <form onSubmit={handleSubmit} className="w-full py-10">
                    <h4>{status ? 'Login successful!' : 'Please enter your credentials'}</h4>
                    <fieldset className="flex flex-col space-y-10 w-[90%] mx-auto">
                        <legend><Badge color={'gray'} size={'3'} highContrast>Login Details</Badge></legend>

                        <div>
                            <label htmlFor="email" className="text-base font-semibold">Email</label>
                            <TextArea
                                id="email"
                                name="email"
                                radius={'full'}
                                placeholder="Enter your email"
                                value={loginData.email}
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
                                placeholder="Enter your password"
                                value={loginData.password}
                                variant={'classic'}
                                onChange={handleInputChange('password')}
                                required
                            />
                        </div>

                        <div className='w-fit mx-auto'>
                            <ButtonX
                                colour={'gold'}
                                variant={'soft'}
                                weight="duotone"
                                icon={SignIn}
                                size="3"
                                iconSize={28}
                                children="Login"
                            />
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
    );
}
