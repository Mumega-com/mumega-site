'use client'

import { type CSSProperties } from 'react'

interface KPICardProps {
  title: string
  value: string | number
  trend?: number
  icon?: string
}

const styles: Record<string, CSSProperties> = {
  card: {
    background: 'var(--ink-surface)',
    border: '1px solid var(--ink-border)',
    borderRadius: '8px',
    padding: '1.25rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    minWidth: '160px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
  },
  title: {
    color: 'var(--ink-muted)',
    fontSize: '0.75rem',
    fontFamily: 'var(--ink-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    margin: 0,
  },
  icon: {
    fontSize: '1rem',
    lineHeight: 1,
  },
  value: {
    color: 'var(--ink-text)',
    fontSize: '1.75rem',
    fontFamily: 'var(--ink-font-display)',
    fontWeight: 700,
    lineHeight: 1.1,
    margin: 0,
  },
  trendRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.8rem',
    fontFamily: 'var(--ink-font-mono)',
  },
  trendUp: {
    color: '#22c55e',
  },
  trendDown: {
    color: '#ef4444',
  },
  trendNeutral: {
    color: 'var(--ink-muted)',
  },
}

export function KPICard({ title, value, trend, icon }: KPICardProps) {
  const trendStyle =
    trend === undefined
      ? styles.trendNeutral
      : trend > 0
        ? styles.trendUp
        : trend < 0
          ? styles.trendDown
          : styles.trendNeutral

  const trendArrow =
    trend === undefined ? null : trend > 0 ? '↑' : trend < 0 ? '↓' : '→'

  const trendLabel =
    trend !== undefined
      ? `${trend > 0 ? '+' : ''}${trend.toFixed(1)}%`
      : null

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <p style={styles.title}>{title}</p>
        {icon && <span style={styles.icon}>{icon}</span>}
      </div>
      <p style={styles.value}>{value}</p>
      {trend !== undefined && (
        <div style={{ ...styles.trendRow, ...trendStyle }}>
          <span>{trendArrow}</span>
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  )
}
