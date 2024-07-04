import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField='discount' options={[
        {label:"all", value:"all"},
        {label:"no-discount", value:"no-discount"},
        {label:"with-discount", value:"with-discount"}
      ]} />

      <SortBy options={[
        {value:"name-asc", label:"Sort by name (A-Z)"},
        {value:"name-desc", label:"Sort by name (Z-A)"},
        {value:"regularPrice-asc", label:"Sort by price (low-first)"},
        {value:"regularPrice-desc", label:"Sort by price (high-first)"},
        {value:"maxCapacity-asc", label:"Sort by max capacity (low-first"},
        {value:"maxCapacity-desc", label:"Sort by max capacity (high-first)"},
      ]} />

    </TableOperations>
  )
}
