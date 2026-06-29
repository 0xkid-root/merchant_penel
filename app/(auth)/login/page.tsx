import AuthLayout from '@/components/auth/AuthLayout'
import LoginForm from '@/features/auth/components/login-form'

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}