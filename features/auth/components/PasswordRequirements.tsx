export function PasswordRequirements() {
  return (
    <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-4 sm:px-5">
      <p className="mb-2 text-sm font-semibold text-slate-900">
        Password requirements
      </p>

      <ul className="space-y-1 text-sm leading-6 text-slate-600">
        <li>• Minimum 8 characters</li>
        <li>• At least one uppercase letter</li>
        <li>• At least one lowercase letter</li>
        <li>• At least one number</li>
      </ul>
    </div>
  )
}
