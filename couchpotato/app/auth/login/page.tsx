'use client';

import { profileUrl } from "@/constants/url";
import { CaretCircleDoubleDown, SignIn, CaretCircleDoubleRight } from "@phosphor-icons/react";
import { Badge, Heading, Text, Box, Card, Flex } from "@radix-ui/themes";
import { Form } from "radix-ui";
import { useState, FormEvent } from "react";
import { UserResponse } from "@/types/user";
import { ButtonX } from "@/components/reuse/buttons";

interface LoginData {
    username: string;
    password: string;
}

export default function LoginPage() {
    const [status, setStatus] = useState(false);
    
    const handleSubmit = async (data: FormData) => {
        const username = data.get('username') as string;
        const password = data.get('password') as string;
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
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
        <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Full Screen Section with Text */}
            <section 
                className="min-h-screen w-full items-center flex p-5 relative bg-cover bg-center"
                style={{ backgroundImage: "url('/auth-bg.jpg')" }}
            >
                <div className="text-center space-y-10 backdrop-blur-md bg-white/30 p-8 rounded-3xl border border-white/40 shadow-lg w-[90%] max-w-md mx-auto">
                    <Heading as={'h1'} size="9" weight={'bold'}>Welcome Back!</Heading>
                    <Text as={'p'} color={'gray'} align={'center'} weight={'bold'}>
                        Log in to access your personalized learning experience and continue your educational journey.
                    </Text>
                    <ButtonX
                        colour='bronze'
                        variant="solid"
                        weight="duotone"
                        icon={CaretCircleDoubleDown}
                        size="3"
                        iconSize={28}
                        className="sm:hidden flex items-center gap-2 mx-auto"
                        children="swipe below"
                    />
                    <ButtonX
                        colour="bronze"
                        variant='outline'
                        weight="duotone"
                        icon={CaretCircleDoubleRight}
                        size="3"
                        iconSize={28}
                        className="hidden sm:flex items-center gap-2 mx-auto font-bold"
                        children="enter your credentials"
                    />
                </div>
            </section>

            {/* Full Screen Section with Form */}
            <section className="min-h-screen w-full items-center flex p-5 overflow-y-auto bg-black text-white">
                <Box className="w-full py-10">
                    <Card size="3" className="w-[90%] mx-auto bg-zinc-900 border-zinc-800">
                        <Flex direction="column" gap="6">
                            <Heading as="h4" size="5" color="gray" align="center">
                                {status ? 'Login successful!' : 'Please enter your credentials'}
                            </Heading>
                            
                            <Badge color="gray" size="3" highContrast className="w-fit mx-auto">
                                Login Details
                            </Badge>
                            
                            <Form.Root className="w-full" onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                handleSubmit(formData);
                            }}>
                                <Form.Field className="mb-4 grid" name="username">
                                    <div className="flex items-baseline justify-between">
                                        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                                            Username
                                        </Form.Label>
                                        <Form.Message
                                            className="text-[13px] text-white opacity-80"
                                            match="valueMissing"
                                        >
                                            Please enter your username
                                        </Form.Message>
                                    </div>
                                    <Form.Control asChild>
                                        <input
                                            className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-full bg-zinc-800 px-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-zinc-700 outline-none selection:bg-zinc-700 selection:text-white hover:shadow-[0_0_0_1px_zinc-600] focus:shadow-[0_0_0_2px_bronze]"
                                            type="text"
                                            required
                                        />
                                    </Form.Control>
                                </Form.Field>
                                
                                <Form.Field className="mb-4 grid" name="password">
                                    <div className="flex items-baseline justify-between">
                                        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                                            Password
                                        </Form.Label>
                                        <Form.Message
                                            className="text-[13px] text-white opacity-80"
                                            match="valueMissing"
                                        >
                                            Please enter your password
                                        </Form.Message>
                                    </div>
                                    <Form.Control asChild>
                                        <input
                                            className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-full bg-zinc-800 px-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-zinc-700 outline-none selection:bg-zinc-700 selection:text-white hover:shadow-[0_0_0_1px_zinc-600] focus:shadow-[0_0_0_2px_bronze]"
                                            type="password"
                                            required
                                        />
                                    </Form.Control>
                                </Form.Field>
                                
                                <Flex justify="center" className="pt-4">
                                    <Form.Submit asChild>
                                        <ButtonX
                                            colour="bronze"
                                            variant="solid"
                                            weight="duotone"
                                            icon={SignIn}
                                            size="3"
                                            iconSize={28}
                                            className="mt-2"
                                        >
                                            Login
                                        </ButtonX>
                                    </Form.Submit>
                                </Flex>
                            </Form.Root>
                        </Flex>
                    </Card>
                </Box>
            </section>
        </div>
    );
}
