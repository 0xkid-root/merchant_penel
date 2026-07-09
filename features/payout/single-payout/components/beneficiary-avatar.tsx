'use client'

interface BeneficiaryAvatarProps {
  name: string
}

export default function BeneficiaryAvatar({
  name,
}: BeneficiaryAvatarProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
      {initials}
    </div>
  )
}