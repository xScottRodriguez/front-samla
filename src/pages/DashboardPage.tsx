import { Container, Heading, VStack } from '@chakra-ui/react'
import { TablePlugin } from '../components/Tables/Table'
import { ColumnDef } from '@tanstack/react-table'
import { TData } from '../services/interfaces'
import { useGetRegistrationRequestsQuery } from '../services'

const columns: ColumnDef<TData, unknown>[] = [
  {
    header: 'Nombres y Apellidos',
    accessorKey: 'name',
  },
  {
    header: 'Correo electrónico',
    accessorKey: 'lastName',
  },
  {
    header: 'Número telefónico',
    accessorKey: 'age',
  },
  {
    header: 'Acciones',
    accessorKey: 'registerDate',
  },
]

export const DashboardPage = () => {
  const { data, isFetching } = useGetRegistrationRequestsQuery()

  return (
    <Container maxW="container.lg">
      <Heading fontSize={'1.5rem'} my="3">
        Historial de Registro
      </Heading>
      <TablePlugin columns={columns} data={[]} isFetching={isFetching} />
    </Container>
  )
}
