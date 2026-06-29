'use client'

import { ReactNode } from 'react'

export interface DataTableColumn<T> {
  key: keyof T
  label: string
  render?: (value: any, row: T) => ReactNode
  className?: string
  sortable?: boolean
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  className?: string
  emptyMessage?: string
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  className = '',
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '15px' }}>
          {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map(column => (
              <th
                key={String(column.key)}
                className={`text-left text-gray-600 py-3 px-4 ${column.className || ''}`}
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick?.(row)}
            >
              {columns.map(column => (
                <td
                  key={String(column.key)}
                  className={`text-gray-900 py-3 px-4 ${column.className || ''}`}
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}
                >
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
