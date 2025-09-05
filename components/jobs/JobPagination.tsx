'use client'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useURLParams } from "@/hooks/use-params-url"
import { useState } from "react"

export function JobPagination({length = 3}:{length?: number}) {


  const { updateParams, getParam } = useURLParams()
  const [currentPage, setCurrentPage] = useState<number>(  () => Number(getParam('page') || '1')  )

  const totalPages = length

  const arrayPages = Array.from({length: totalPages}, (_, i) => i + 1)

  const changePage = (newPage: number) => {
    if(newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage)
    updateParams({'page': newPage.toString()})
  }

  return (
    <Pagination >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => changePage(currentPage - 1)} />
        </PaginationItem>
       
        {arrayPages.map((pageNumber) => (
          <PaginationItem key={pageNumber} >
            <PaginationLink onClick={() => changePage(pageNumber)} isActive={pageNumber === currentPage}>{pageNumber}</PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext onClick={() => changePage(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
