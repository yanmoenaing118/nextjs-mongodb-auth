import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useToken from "../lib/auth/useToken";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { mutate } = useToken();

  async function submitHandler(e) {
    e.preventDefault();
    mutate(
      await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then((res) => res.json())
    );

    router.replace("/");
  }

  function handleChange(field, value) {
    setForm({ ...form, [field]: value });
  }

  return (
    <div>
      <header>login</header>
      <form onSubmit={submitHandler}>
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
          <input type="submit" />
        </div>
      </form>
      <div>
        Don't have an account?
        <Link href="/register">
          <a>regiter an account</a>
        </Link>
      </div>
    </div>
  );
}
