'use client'

import { type CSSProperties } from 'react'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface DataPoint {
  date: string
  value: number
}

interface LineChartProps {
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

export function LineChart({ data, label, color }: LineChartProps) {
  const lineColor = color ?? 'var(--ink-primary)'

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>{label}</span>
      <ResponsiveContainer width="100%" height={220}>
        <RechartsLineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--ink-border)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
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
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: lineColor, strokeWidth: 0 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}
