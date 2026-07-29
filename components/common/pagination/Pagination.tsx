'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface PaginationProps {
    page: number
    totalPages: number
    totalElements: number
    pageSize: number
    onPageChange: (page: number) => void
    itemName?: string
}

const Pagination = React.memo(({
    page,
    totalPages,
    totalElements,
    pageSize,
    onPageChange,
    itemName = 'items'
}: PaginationProps) => {
    const startItem = totalElements === 0 ? 0 : page * pageSize + 1
    const endItem = Math.min((page + 1) * pageSize, totalElements)

    const generatePages = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        const pages: (number | string)[] = []
        const currentPage = page + 1

        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, '...', totalPages)
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
        } else {
            pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
        }

        return pages
    }

    const pages = generatePages()

    return (
        <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-700">{startItem}–{endItem}</span> of{' '}
                <span className="font-medium text-slate-700">{totalElements}</span> {itemName}
            </p>

            <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                    type="button"
                    aria-label="Previous page"
                    disabled={page === 0}
                    onClick={() => onPageChange(page - 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition-colors disabled:cursor-not-allowed disabled:bg-slate-50"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                {pages.map((p, index) => {
                    if (p === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="flex h-10 w-10 items-center justify-center text-slate-500">
                                ...
                            </span>
                        )
                    }

                    const pageNumber = p as number
                    const isActive = pageNumber - 1 === page

                    return (
                        <button
                            key={pageNumber}
                            type="button"
                            aria-label={`Page ${pageNumber}`}
                            onClick={() => onPageChange(pageNumber - 1)}
                            className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
                                isActive
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            {pageNumber}
                        </button>
                    )
                })}

                <button
                    type="button"
                    aria-label="Next page"
                    disabled={page >= totalPages - 1 || totalPages === 0}
                    onClick={() => onPageChange(page + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400 disabled:bg-slate-50"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
})

Pagination.displayName = 'Pagination'

export default Pagination
