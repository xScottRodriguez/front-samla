import { Button } from '@chakra-ui/react'
import  { FC } from 'react'
import { TData } from '../services/interfaces'
import { useAppDispatch } from '../hooks'
import { setActiveItem, toggleModal } from '../store'

interface Props{
  row: TData
}
export const Options: FC<Props> = ({ row }) => {
  const dispatch = useAppDispatch()
  const OnOpen = () => {
    dispatch(setActiveItem(row))
    dispatch(toggleModal())
  }
  return (
    <Button
      variant={'link'}
      colorScheme="blue"
      size="sm"
      onClick={OnOpen}
    >
      Ver Detalles
    </Button>
  )
}
