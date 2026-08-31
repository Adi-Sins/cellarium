import { useState } from "react";
import { supabase } from "../utils/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function signUp() {
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    });
    
    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Logged in successfully.");  

  }

  async function logIn() {


    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Logged in successfully.");
  }

  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-3xl border border-sage-dark/10 bg-white/60 p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-sage-dark">
          Welcome to Cellarium
        </h1>

        <p className="mt-2 text-sm text-ink/60">
          Sign up or log in to access your workspace.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-sage-dark/20 bg-white px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-sage-dark/20 bg-white px-4 py-3"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={signUp}
              className="flex-1 rounded-2xl bg-sage px-4 py-3 font-medium text-white"
            >
              Sign Up
            </button>

            <button
              type="button"
              onClick={logIn}
              className="flex-1 rounded-2xl bg-sage-dark px-4 py-3 font-medium text-white"
            >
              Log In
            </button>
          </div>

          {message && (
            <p className="text-sm text-ink/70">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Login;