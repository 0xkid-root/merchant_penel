'use client'

import { Shield, Zap, Headphones } from 'lucide-react'

export function FeatureCards() {
  const features = [
    {
      icon: Shield,
      title: 'Bank Level Security',
      description: 'Your data is protected with 256-bit encryption',
      color: 'from-indigo-50 to-indigo-100',
      iconColor: 'text-indigo-600',
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'Fast and reliable payouts processing',
      color: 'from-purple-50 to-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: "We're here to help you anytime, anywhere",
      color: 'from-indigo-50 to-indigo-100',
      iconColor: 'text-indigo-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {features.map((feature, idx) => {
        const IconComponent = feature.icon
        return (
          <div key={idx} className="text-center">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4`}>
              <IconComponent className={`h-8 w-8 ${feature.iconColor}`} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}
