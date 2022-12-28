import React, { useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./Auth.css";
const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [formState, inputHandler, setFromData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const loginSubmitHandler = (event) => {
		event.preventDefault();
		console.log(formState.inputs); // send this to the backend
		auth.login();
	};

	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFromData(
				{
					...formState.inputs,
					name: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFromData(
				{
					...formState.inputs,
					name: {
						value: "",
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((prevMode) => !prevMode);
	};
	return (
		<Card className="authentication">
			<h2>Login Required</h2>
			<hr />
			<form className="email-form" onSubmit={loginSubmitHandler}>
				{!isLoginMode && (
					<Input
						id="name"
						element="input"
						type="name"
						label="Your Name"
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter your name"
						onInput={inputHandler}
						// initialValue={formState.inputs.title.value}
						// initialIsValid={formState.inputs.title.isValid}
					/>
				)}
				<Input
					id="email"
					element="input"
					type="email"
					label="Email"
					validators={[VALIDATOR_EMAIL()]}
					errorText="Please enter a valid email address"
					onInput={inputHandler}
					// initialValue={formState.inputs.title.value}
					// initialIsValid={formState.inputs.title.isValid}
				/>
				<Input
					id="password"
					element="input"
					type="password"
					label="Password"
					validators={[VALIDATOR_MINLENGTH(6)]}
					errorText="Please enter a valid password(at least 6 characters)"
					onInput={inputHandler}
					// initialValue={formState.inputs.description.value}
					// initialIsValid={formState.inputs.description.isValid}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					{isLoginMode ? "LOGIN" : "SING UP"}
				</Button>
			</form>
			<Button inverse onClick={switchModeHandler}>
				SWITCH TO {isLoginMode ? "SIGN UP" : "LOGIN"}
			</Button>
		</Card>
	);
};

export default Auth;
