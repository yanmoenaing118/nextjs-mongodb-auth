import { useState } from "react/cjs/react.development";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    passwordConfirm: "",
  });

  function submitHandler(e) {
    e.preventDefault();

    console.log(form);
  }

  function handleChange(field, value) {
    setForm({ ...form, [field]: value });
  }

  return (
    <div>
      <header>login</header>
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
