import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';

interface AiDashboardWidgetProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'UP' | 'DOWN' | 'STABLE';
  trendValue?: string;
  icon: LucideIcon;
  gradient: string;
  badgeText?: string;
  badgeType?: 'success' | 'warning' | 'danger' | 'info';
  onClick?: () => void;
}

export const AiDashboardWidget: React.FC<AiDashboardWidgetProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon: Icon,
  gradient,
  badgeText,
  badgeType = 'info',
  onClick,
}) => {
  const badgeStyles = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative p-5 rounded-2xl border border-white/10 backdrop-blur-xl bg-slate-900/60 shadow-2xl overflow-hidden cursor-pointer group transition-all duration-300`}
    >
      {/* Background Subtle Gradient Glow */}
      <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full ${gradient} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`} />

      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className={`p-2.5 rounded-xl bg-slate-800/80 border border-white/10 ${gradient} bg-clip-text text-transparent shadow-inner`}>
            <Icon className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</h3>
            {badgeText && (
              <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-medium rounded-full border ${badgeStyles[badgeType]}`}>
                {badgeText}
              </span>
            )}
          </div>
        </div>

        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg border ${
            trend === 'UP' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
            trend === 'DOWN' ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' :
            'text-slate-400 bg-slate-800/50 border-slate-700/50'
          }`}>
            {trend === 'UP' && <TrendingUp className="w-3.5 h-3.5" />}
            {trend === 'DOWN' && <TrendingDown className="w-3.5 h-3.5" />}
            {trend === 'STABLE' && <Minus className="w-3.5 h-3.5" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      <div className="mt-2 relative z-10">
        <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-mono">{value}</div>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>

      {/* iOS 26 Glass Highlight Bar */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.div>
  );
};
