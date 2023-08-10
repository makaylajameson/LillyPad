import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [image, setImage] = useState(null);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	useEffect(() => {
		const errors = {}

		if (username.length < 4 || username.length > 30) errors["username"] = "Username must be between 4-30 characters"
		if (!username.length) errors["username"] = "Username is required"
		if (!firstName.length) errors["firstName"] = "First name is required"
		if (firstName.length > 30 || firstName.length < 2) errors["firstName"] = "First name must be between 2-30 characters"
		if (!lastName.length) errors["lastName"] = "Last name is required"
		if (lastName.length > 30 || lastName.length < 2) errors["lastName"] = "Last name must be between 2-30 characters"
		if (!email.includes('@') || !email.includes('.')) errors["email"] = "Please include a valid email"
		if (password.length < 6) errors["password"] = "Password must be at least 6 characters long."
		if (password.length > 30) errors["password"] = "Password must be less than 30 characters"
		if (password !== confirmPassword) errors["password"] = "Password and confirm password must match"

		setErrors(errors)
	}, [email, username, firstName, lastName, password, confirmPassword])

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		if (Object.values(errors).length) return

		formData.append("first_name", firstName);
		formData.append("last_name", lastName);
		formData.append("username", username);
		formData.append("profile_pic", image);
		formData.append("email", email);
		formData.append("password", password);

		if (password === confirmPassword) {
			const data = await dispatch(signUp(formData));
			if (data) {
				setErrors(data);
			} else {
				await closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<ul>
					{Object.values(errors).map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Profile Image
					<input
						type="file"
						accept="image/*"
						onChange={(e) => setImage(e.target.files[0])}
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
