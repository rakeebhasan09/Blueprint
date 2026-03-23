"use client";
import RegisterForm from "@/components/forms/RegisterForm";
import React, { Suspense } from "react";

const RegisterPage = () => {
	return (
		<Suspense>
			<RegisterForm />
		</Suspense>
	);
};

export default RegisterPage;
