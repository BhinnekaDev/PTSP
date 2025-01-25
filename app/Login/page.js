import LoginForm from "@/app/Login/components/Login";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-secondary to-primary">
      <Toaster position="top-right" reverseOrder={false} />
      <LoginForm />
    </div>
  );
}

export default Login;
