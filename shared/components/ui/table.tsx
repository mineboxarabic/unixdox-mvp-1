"use client"

import { Table as ChakraTable, TableRootProps, TableBodyProps, TableCellProps, TableColumnHeaderProps, TableFooterProps, TableHeaderProps, TableRowProps } from "@chakra-ui/react"
import * as React from "react"

export const Table = React.forwardRef<HTMLTableElement, TableRootProps>(
  (props, ref) => (
    <ChakraTable.Root ref={ref} variant="outline" size="sm" {...props} />
  ),
)
Table.displayName = "Table"

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  (props, ref) => <ChakraTable.Header ref={ref} {...props} />,
)
TableHeader.displayName = "TableHeader"

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props, ref) => <ChakraTable.Body ref={ref} {...props} />,
)
TableBody.displayName = "TableBody"

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  (props, ref) => <ChakraTable.Footer ref={ref} {...props} />,
)
TableFooter.displayName = "TableFooter"

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (props, ref) => <ChakraTable.Row ref={ref} {...props} />,
)
TableRow.displayName = "TableRow"

export const TableHead = React.forwardRef<HTMLTableCellElement, TableColumnHeaderProps>(
  (props, ref) => <ChakraTable.ColumnHeader ref={ref} {...props} />,
)
TableHead.displayName = "TableHead"

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (props, ref) => <ChakraTable.Cell ref={ref} {...props} />,
)
TableCell.displayName = "TableCell"
