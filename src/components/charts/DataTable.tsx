'use client'

import { useState, type CSSProperties } from 'react'

interface Column {
  key: string
  label: string
}

interface DataTableProps {
  columns: Column[]
  rows: Record<string, unknown>[]
  sortable?: boolean
}

type SortDir = 'asc' | 'desc'

const wrapperStyle: CSSProperties = {
  background: 'var(--ink-surface)',
  border: '1px solid var(--ink-border)',
  borderRadius: '8px',
  overflow: 'hidden',
}

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'var(--ink-font-mono)',
  fontSize: '0.8rem',
}

const thStyle: CSSProperties = {
  padding: '0.625rem 1rem',
  textAlign: 'left',
  color: 'var(--ink-muted)',
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  borderBottom: '1px solid var(--ink-border)',
  background: 'var(--ink-bg)',
  userSelect: 'none',
  whiteSpace: 'nowrap',
}

const thSortableStyle: CSSProperties = {
  ...thStyle,
  cursor: 'pointer',
}

const tdStyle: CSSProperties = {
  padding: '0.625rem 1rem',
  color: 'var(--ink-text)',
  borderBottom: '1px solid var(--ink-border)',
  verticalAlign: 'middle',
}

const tdLastStyle: CSSProperties = {
  ...tdStyle,
  borderBottom: 'none',
}

function SortIndicator({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) {
    return <span style={{ marginLeft: '0.25rem', opacity: 0.3 }}>↕</span>
  }
  return (
    <span style={{ marginLeft: '0.25rem', color: 'var(--ink-primary)' }}>
      {dir === 'asc' ? '↑' : '↓'}
    </span>
  )
}

export function DataTable({ columns, rows, sortable = false }: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  function handleSort(key: string) {
    if (!sortable) return
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = sortable && sortKey
    ? [...rows].sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        if (av === bv) return 0
        const cmp = String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true })
        return sortDir === 'asc' ? cmp : -cmp
      })
    : rows

  return (
    <div style={wrapperStyle}>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={sortable ? thSortableStyle : thStyle}
                  onClick={() => sortable && handleSort(col.key)}
                >
                  {col.label}
                  {sortable && (
                    <SortIndicator
                      active={sortKey === col.key}
                      dir={sortDir}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <td
                    key={col.key}
                    style={
                      rowIdx === sorted.length - 1 && colIdx === 0
                        ? tdLastStyle
                        : rowIdx === sorted.length - 1
                          ? { ...tdLastStyle }
                          : tdStyle
                    }
                  >
                    {String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ ...tdLastStyle, color: 'var(--ink-muted)', textAlign: 'center', padding: '2rem' }}
                >
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
