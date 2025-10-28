import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if(!email) { setMessage("Please enter an email"); return; }
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL || ""}/api/login`,
        { email }
      );
      setMessage(`Welcome ${res.data.name}! ✨ You have ${res.data.points} points.`);
    } catch (e) {
      setMessage("Oops — can't reach backend. Deploy backend and set REACT_APP_API_URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fun">
      <div className="max-w-md w-full mx-4 glass text-white shadow-2xl floaty">
        <div className="p-8">
          <h1 className="text-4xl font-extrabold mb-4">Credish — Fun Pitch</h1>
          <p className="mb-6 text-gray-200">A playful rewards prototype for pitching. Sign in to see points and rewards.</p>

          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 rounded mb-4 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              onClick={handleLogin}
              className="flex-1 py-3 rounded bg-white text-black font-semibold shadow"
              disabled={loading}
            >
              {loading ? "Connecting..." : "Magic Sign In"}
            </button>
            <button
              onClick={() => { setEmail('demo@cred.com'); setMessage('Try demo@cred.com then click Sign In'); }}
              className="px-4 py-3 rounded border border-white/30"
            >
              Demo
            </button>
          </div>

          <p className="mt-6 text-yellow-100">{message}</p>

          <div className="mt-6 text-sm text-white/70">
            <strong>Tip:</strong> Deploy backend on Render and set REACT_APP_API_URL env var in frontend service.
          </div>
        </div>
      </div>
    </div>
  );
}
