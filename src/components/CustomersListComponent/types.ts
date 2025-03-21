import { CustomerProps } from "components/CustomerComponent/types"

import { ReactNode } from "react"

export interface CustomersListProps {
  children?: ReactNode
  customers: CustomerProps[]
}
