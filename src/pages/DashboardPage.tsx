import { Button, Container, Heading } from '@chakra-ui/react'
import { TablePlugin } from '../components/Tables/Table'
import { ColumnDef } from '@tanstack/react-table'
import { TData } from '../services/interfaces'
import { useGetRegistrationRequestsQuery } from '../services'
import { Navbar } from '../components/Navbar'
import { ModalCustom } from '../components/Modal'
import { useAppDispatch } from '../hooks'
import { toggleModal } from '../store'

const columns: ColumnDef<TData, unknown>[] = [
  {
    header: 'Nombres y Apellidos',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    header: 'Correo electrónico',
    accessorKey: 'email',
  },
  {
    header: 'Número telefónico',
    accessorKey: 'phoneNumber',
  },
  {
    header: 'Acciones',
    accessorKey: 'id',
    cell: (row) => (
      <Button
        variant={'link'}
        colorScheme="blue"
        size="sm"
        onClick={() => {
          open()
        }}
      >
        Ver Detalles
      </Button>
    ),
  },
]

export const DashboardPage = () => {
  const { data,isFetching } = useGetRegistrationRequestsQuery()
  
  const dispatch = useAppDispatch()
  const OnOpen = () => { 
    dispatch(toggleModal())
  }

  return (
    <>
      <Navbar />
      <Container maxW="container.xl" mt="3.438rem">
        <Heading fontSize={'1.5rem'} my="1.5rem">
          Historial de Registro
        </Heading>
        <TablePlugin
          columns={columns}
          data={data?.data ?? []}
          isFetching={isFetching}
        />
      </Container>
      <ModalCustom />
    </>
  )
}
