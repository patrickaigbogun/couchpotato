'use client';

import { profileUrl } from "@/constants/url";
import { CaretCircleDoubleDown, UserPlus, CaretCircleDoubleRight, CheckCircle, XCircle } from "@phosphor-icons/react";
import { Badge, Heading, Text, Box, Card, Flex, Link } from "@radix-ui/themes";
import { Form } from "radix-ui";
import { useState, FormEvent, useEffect } from "react";
import { UserResponse } from "@/types/user";
import { ButtonX } from "@/components/reuse/buttons";
import { toast } from "react-toastify";

interface RegisterData {
    username: string;
    email: string;
    password: string;
}

interface PasswordValidation {
    minLength: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
    isValid: boolean;
}

export default function RegisterPage() {
    const [status, setStatus] = useState(false);
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState<PasswordValidation>({
        minLength: false,
        hasNumber: false,
        hasSpecial: false,
        isValid: false
    });
    
    // Validate password as user types
    useEffect(() => {
        const minLength = password.length >= 8;
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isValid = minLength && hasNumber && hasSpecial;
        
        setValidation({
            minLength,
            hasNumber,
            hasSpecial,
            isValid
        });
    }, [password]);
    
    const handleSubmit = async (data: FormData) => {
        const username = data.get('username') as string;
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        
        if (!validation.isValid) {
            toast.error("Password doesn't meet requirements");
            return;
        }
        
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            
            const responseData = await response.json();
            
            if (response.status === 201) {
                toast.success(responseData.message || "Registration successful!");
                setStatus(true);
                location.replace(profileUrl);
            } else {
                // Display appropriate error message based on status code
                const errorMessage = responseData.error || "An error occurred during registration";
                toast.error(errorMessage);
                setStatus(false);
            }
        } catch (error) {
            toast.error("Connection failed. Please check your network");
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
                    <Heading as={'h1'} size="9" weight={'bold'}>Join Our Community!</Heading>
                    <Text as={'p'} color={'gray'} align={'center'} weight={'bold'}>
                        Register now to access exclusive educational content and start your learning journey with us.
                    </Text>
                    
                    <Flex direction="column" gap="3" align="center">
                        <Text as="p" weight="bold">
                            Already have an account?{' '}
                            <Link href="/auth/login" weight="bold" className="text-zinc-800 hover:text-bronze-9 transition-colors">
                                Login
                            </Link>
                        </Text>
                    </Flex>
                    
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
                        colour='bronze'
                        variant='solid'
                        weight="duotone"
                        icon={CaretCircleDoubleRight}
                        size="3"
                        iconSize={28}
                        className="hidden sm:flex items-center gap-2 mx-auto font-bold"
                        children="fill in your details"
                    />
                </div>
            </section>

            {/* Full Screen Section with Form */}
            <section className="min-h-screen w-full items-center flex p-5 overflow-y-auto bg-black text-white">
                <Box className="w-full py-10">
                    <Card size="3" className="w-[90%] mx-auto bg-zinc-900 border-zinc-800">
                        <Flex direction="column" gap="6">
                            <Heading as="h4" size="5" color="gray" align="center">
                                {status ? 'Registration successful!' : 'Please create your account'}
                            </Heading>
                            
                            <Badge color="gray" size="3" highContrast className="w-fit mx-auto">
                                Registration Details
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
                                            Please choose a username
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
                                
                                <Form.Field className="mb-4 grid" name="email">
                                    <div className="flex items-baseline justify-between">
                                        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                                            Email
                                        </Form.Label>
                                        <Form.Message
                                            className="text-[13px] text-white opacity-80"
                                            match="valueMissing"
                                        >
                                            Please enter your email
                                        </Form.Message>
                                    </div>
                                    <Form.Control asChild>
                                        <input
                                            className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-full bg-zinc-800 px-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-zinc-700 outline-none selection:bg-zinc-700 selection:text-white hover:shadow-[0_0_0_1px_zinc-600] focus:shadow-[0_0_0_2px_bronze]"
                                            type="email"
                                            required
                                        />
                                    </Form.Control>
                                </Form.Field>
                                
                                <Form.Field className="mb-2 grid" name="password">
                                    <div className="flex items-baseline justify-between">
                                        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                                            Password
                                        </Form.Label>
                                        <Form.Message
                                            className="text-[13px] text-white opacity-80"
                                            match="valueMissing"
                                        >
                                            Please create a password
                                        </Form.Message>
                                    </div>
                                    <Form.Control asChild>
                                        <input
                                            className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-full bg-zinc-800 px-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-zinc-700 outline-none selection:bg-zinc-700 selection:text-white hover:shadow-[0_0_0_1px_zinc-600] focus:shadow-[0_0_0_2px_bronze]"
                                            type="password"
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                        />
                                    </Form.Control>
                                </Form.Field>
                                
                                {/* Password validation indicators */}
                                <div className="mb-4 p-3 bg-zinc-800 rounded-md border border-zinc-700">
                                    <Text size="2" as="p" mb="2" color="gray">Password requirements:</Text>
                                    <Flex direction="column" gap="1">
                                        <Flex align="center" gap="1">
                                            {validation.minLength ? 
                                                <CheckCircle weight="fill" className="text-green-500" /> : 
                                                <XCircle weight="fill" className="text-red-500" />
                                            }
                                            <Text size="1" color={validation.minLength ? "green" : "red"}>
                                                At least 8 characters
                                            </Text>
                                        </Flex>
                                        <Flex align="center" gap="1">
                                            {validation.hasNumber ? 
                                                <CheckCircle weight="fill" className="text-green-500" /> : 
                                                <XCircle weight="fill" className="text-red-500" />
                                            }
                                            <Text size="1" color={validation.hasNumber ? "green" : "red"}>
                                                Includes a number
                                            </Text>
                                        </Flex>
                                        <Flex align="center" gap="1">
                                            {validation.hasSpecial ? 
                                                <CheckCircle weight="fill" className="text-green-500" /> : 
                                                <XCircle weight="fill" className="text-red-500" />
                                            }
                                            <Text size="1" color={validation.hasSpecial ? "green" : "red"}>
                                                Includes a special character (!@#$%^&*.,?)
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </div>
                                
                                <Flex justify="center" className="pt-4">
                                    <Form.Submit asChild>
                                        <ButtonX
                                            colour="bronze"
                                            variant="solid"
                                            weight="duotone"
                                            icon={UserPlus}
                                            size="3"
                                            iconSize={28}
                                            className="mt-2"
                                            disabled={!validation.isValid}
                                        >
                                            Register
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

