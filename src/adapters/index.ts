import {
  IcommonAdapterWithoutDepartment,
  ICommonData,
} from '../services/interfaces'

export const commonAdapter = (
  data: ICommonData[],
): IcommonAdapterWithoutDepartment[] => {
  return data.map((item) => {
    return {
      label: item.name,
      value: item._id,
    }
  })
}
