import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export function StatCard({
  label,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconBg,
  iconColor,
}: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">

        <div className="space-y-2">

          <p className="text-sm font-medium text-slate-500">
            {label}
          </p>

          <h2 className="text-[24px] font-bold tracking-tight text-slate-900">
            {value}
          </h2>

        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBg}`}
        >
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>

      </div>

      {change && (
        <div className="mt-6">
          <span
            className={`text-sm font-semibold ${
              changeType === "up"
                ? "text-green-600"
                : changeType === "down"
                ? "text-red-500"
                : "text-blue-600"
            }`}
          >
            {changeType === "up" && "↑ "}
            {changeType === "down" && "↓ "}
            {change}
          </span>
        </div>
      )}
    </div>
  );
}