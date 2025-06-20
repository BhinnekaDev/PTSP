import LoginForm from "@/app/Login/components/Login";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <LoginForm />
    </div>
  );
}

export default Login;
