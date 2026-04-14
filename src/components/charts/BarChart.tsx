'use client'

import { type CSSProperties } from 'react'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

interface DataPoint {
  name: string
  value: number
}

interface BarChartProps {
  data: DataPoint[]
  label: string
  color?: string
}

const containerStyle: CSSProperties = {
  background: 'var(--ink-surface)',
  border: '1px solid var(--ink-border)',
  borderRadius: '8px',
  padding: '1.25rem 1.5rem',
}

const labelStyle: CSSProperties = {
  color: 'var(--ink-muted)',
  fontSize: '0.75rem',
  fontFamily: 'var(--ink-font-mono)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: '1rem',
  display: 'block',
}

const tooltipStyle: CSSProperties = {
  background: 'var(--ink-surface)',
  border: '1px solid var(--ink-border)',
  borderRadius: '6px',
  color: 'var(--ink-text)',
  fontFamily: 'var(--ink-font-mono)',
  fontSize: '0.8rem',
  padding: '0.5rem 0.75rem',
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div style={tooltipStyle}>
      <div style={{ color: 'var(--ink-muted)', marginBottom: '0.25rem' }}>{label}</div>
      <div style={{ color: 'var(--ink-text)', fontWeight: 600 }}>{payload[0].value.toLocaleString()}</div>
    </div>
  )
}

export function BarChart({ data, label, color }: BarChartProps) {
  const barColor = color ?? 'var(--ink-primary)'

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>{label}</span>
      <ResponsiveContainer width="100%" height={220}>
        <RechartsBarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--ink-border)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: 'var(--ink-muted)', fontSize: 11, fontFamily: 'var(--ink-font-mono)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--ink-muted)', fontSize: 11, fontFamily: 'var(--ink-font-mono)' }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--ink-border)', opacity: 0.4 }} />
          <Bar dataKey="value" radius={[3, 3, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={barColor} opacity={0.9} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
