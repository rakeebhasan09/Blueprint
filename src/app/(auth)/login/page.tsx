"use client";
import LoginForm from "@/components/forms/LoginForm";
import React, { Suspense } from "react";

const LoginPage = () => {
	return (
		<>
			<Suspense>
				<LoginForm />
			</Suspense>
		</>
	);
};

export default LoginPage;
