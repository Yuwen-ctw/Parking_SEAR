export interface TPEDataType {
  id: string
  area: string
  name: string
  address: string
  serviceTime: string
  availablecar?: number
  totalcar: number
  availablemotor?: number
  totalmotor: number
  Handicap_First: string
  Pregnancy_First: string
  ChargeStation: {
    scoketStatusList: {
      spot_abrv: string
      spot_status: string
    }[]
  }
  lat: string
  lng: string
  payex: string
  tel: string
  updateTime: string
}

export interface HSCDataType {
  PARKNO: string
  PARKINGNAME: string
  ADDRESS: string
  BUSINESSHOURS: string
  WEEKDAYS: string
  HOLIDAY: string
  FREESPACEBIG: number
  TOTALSPACEBIG: number
  FREESPACE: number
  TOTALSPACE: number
  FREESPACEMOT: number
  TOTALSPACEMOT: number
  FREESPACEDIS: number
  TOTALSPACEDIS: number
  FREESPACECW: number
  TOTALSPACECW: number
  FREESPACEECAR: number
  TOTALSPACEECAR: number
  X_COORDINATE: string
  Y_COORDINATE: string
  UPDATETIME: string
}
