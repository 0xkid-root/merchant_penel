import AuthLayout from '@/components/auth/AuthLayout'
import ChangePasswordPage from '@/features/auth/pages/change-password'

export default function Page() {
    return (
        <AuthLayout>
            <ChangePasswordPage />
        </AuthLayout>
    )
}