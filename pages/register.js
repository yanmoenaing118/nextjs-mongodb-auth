import { useState } from "react";
import { useRouter } from "next/router";
import useToken from "../lib/auth/useToken";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    passwordConfirm: "",
  });

  const router = useRouter();

  const { user, mutate } = useToken();

  async function submitHandler(e) {
    e.preventDefault();

    mutate(
      await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then((res) => res.json())
    );

    console.log("new user ", user);
  }

  function handleChange(field, value) {
    setForm({ ...form, [field]: value });
  }

  return (
    <div>
      <header>Register an account</header>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Full Name: </label>
          <input
            value={form.name}
            type="text"
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            value={form.email}
            type="email"
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            value={form.password}
            type="password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Confirm Password: </label>
          <input
            value={form.passwordConfirm}
            type="password"
            onChange={(e) => handleChange("passwordConfirm", e.target.value)}
          />
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
