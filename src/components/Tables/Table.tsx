import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
} from '@tanstack/react-table'
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Table as TableChakra,
  TableContainer,
  Flex,
  IconButton,
  Button,
} from '@chakra-ui/react'
import { flexRender } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { Loader } from '../Loader'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface TablePluginProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  initialPageSize?: number
  rowPerPagination?: number[]
  isFetching?: boolean
  filtering?: string
  onFilteringChange?: (value: string) => void
  isInternalFiltering?: boolean
  contextMenu?: (e: React.MouseEvent<HTMLTableElement, MouseEvent>) => void
}

export const Pagination = ({ table }: { table: any }) => {
  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex

  const paginationRange = useMemo(() => {
    const totalPageNumbers = 5
    const pageNeighbours = 1

    if (pageCount <= totalPageNumbers) {
      return Array.from({ length: pageCount }, (_, i) => i + 1)
    }

    const startPage = Math.max(2, currentPage - pageNeighbours)
    const endPage = Math.min(pageCount - 1, currentPage + pageNeighbours)

    const pages: (number | string)[] = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    )

    if (startPage > 2) {
      pages.unshift('...')
    }
    if (endPage < pageCount - 1) {
      pages.push('...')
    }

    return [1, ...pages, pageCount]
  }, [currentPage, pageCount])

  return (
    <Flex justify="center" mt={4} alignItems="center" gap={2}>
      <IconButton
        aria-label="Previous page"
        icon={<FiChevronLeft />}
        onClick={() => table.previousPage()}
        isDisabled={!table.getCanPreviousPage()}
      />

      {paginationRange.map((page, index) =>
        page === '...' ? (
          <Text key={index} mx={2}>
            {page}
          </Text>
        ) : (
          <Button
            key={index}
            onClick={() => table.setPageIndex(page - 1)}
            isActive={page === currentPage + 1}
            variant={page === currentPage + 1 ? 'outline' : ''}
            colorScheme="blue.500"
          >
            {page}
          </Button>
        ),
      )}

      <IconButton
        aria-label="Next page"
        icon={<FiChevronRight />}
        onClick={() => table.nextPage()}
        isDisabled={!table.getCanNextPage()}
      />
    </Flex>
  )
}

export const TablePlugin = <TData,>({
  columns,
  data = [],
  initialPageSize = 25,
  isFetching = false,
  filtering = '',
  onFilteringChange,
  isInternalFiltering = true,
}: TablePluginProps<TData>) => {
  const [internalFiltering, setInternalFiltering] = useState<string>('')

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: initialPageSize,
      },
    },
    state: {
      globalFilter: isInternalFiltering ? internalFiltering : filtering,
    },
    onGlobalFilterChange: isInternalFiltering
      ? setInternalFiltering
      : onFilteringChange,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (isInternalFiltering) {
      return setInternalFiltering(value)
    } else {
      return onFilteringChange?.(value)
    }
  }

  return (
    <>
      <TableContainer>
        <TableChakra colorScheme="blue">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    display={{
                      base:
                        header.id === 'columnIdToHide' ? 'none' : 'table-cell',
                      md: 'table-cell',
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {isFetching && (
              <Tr>
                <Td colSpan={columns.length}>
                  <Loader />
                </Td>
              </Tr>
            )}
            {!data.length && !isFetching && (
              <tr>
                <Td colSpan={columns.length} textAlign="center">
                  <Text>Sin datos que mostrar</Text>
                </Td>
              </tr>
            )}
            {!isFetching &&
              table.getRowModel().rows.map((rowModel) => (
                <Tr _hover={{ bg: 'blue.50' }} key={rowModel.id}>
                  {rowModel.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
          </Tbody>
        </TableChakra>
        <Pagination table={table} />
      </TableContainer>
    </>
  )
}
