"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password === "furniture7805") {
      
      router.push("/dashboard");
    } else {
      alert("Incorrect Password!");
    }
  };

  return (
   
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="p-6 w-[400px] bg-[#B88E2F] h-[250px] rounded-lg shadow-lg">
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <h2 className="text-2xl underline font-extrabold text-center mb-6 text-black">
            Admin Sign In
          </h2>
          <div className="flex flex-col gap-4">
            
          <div className="relative">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <div className="absolute right-3 top-3 text-gray-500 cursor-pointer">🔒</div>
          </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 p-2 bg-black text-white rounded-lg hover:bg-black transition"
          >
            Login
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
