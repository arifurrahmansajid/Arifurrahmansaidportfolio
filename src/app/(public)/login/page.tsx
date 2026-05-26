export const metadata = {
  title: "Login | Md Arifur Rahman Sajid",
  description: "Login to the portfolio of Md Arifur Rahman Sajid."
};
import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
