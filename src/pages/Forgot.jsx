// src/pages/Forgot.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import axios from "axios";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.post("https://sistema-online-render-backend.onrender.com/auth/forgot", { email });

      setMessage("Um link de redefinição foi enviado para seu e-mail!");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Erro ao solicitar recuperação de senha."
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 p-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md p-10 rounded-3xl shadow-xl border border-slate-200"
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Recuperar Senha
        </h1>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm mb-4 border border-green-300">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4 border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="font-semibold text-slate-700 flex items-center gap-2 mb-1">
              <Mail size={18} /> Seu e-mail
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-md"
          >
            Enviar link de recuperação
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
