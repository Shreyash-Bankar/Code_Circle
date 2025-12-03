import { useState } from "react";

function Auth() {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mode === "login" ? "Login" : "Register", form);
    alert(`${mode === "login" ? "Login" : "Signup"} (mock). Backend later.`);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setMode("login")}
          className={`flex-1 py-2 rounded-md text-sm font-semibold ${
            mode === "login"
              ? "bg-indigo-600 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode("register")}
          className={`flex-1 py-2 rounded-md text-sm font-semibold ${
            mode === "register"
              ? "bg-indigo-600 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          Sign up
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-900 p-6 rounded-lg border border-gray-800"
      >
        {mode === "register" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">First name</label>
              <input
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last name</label>
              <input
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2"
                required
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2"
            required
          />
        </div>

        {mode === "register" && (
          <div>
            <label className="block text-sm mb-1">
              Primary skills (comma separated)
            </label>
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold"
        >
          {mode === "login" ? "Login" : "Create account"}
        </button>
      </form>
    </div>
  );
}

export default Auth;
