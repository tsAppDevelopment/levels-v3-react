import create, {State} from 'zustand'
import {AircraftDeep} from '../types/aircraftDeep'
import {CargoSchema} from '../util'
export interface AirStoreState extends State {
  selectedAir: AircraftDeep | undefined
  cargoSchema: CargoSchema | undefined
  setCargoSchema: (cargoSchema: CargoSchema) => void
  setSelectedAir: (air: AircraftDeep) => void
}

export const AirStore = create<AirStoreState>((set) => ({
  selectedAir: undefined,
  cargoSchema: undefined,
  setCargoSchema: (cargoSchema) => 
    set((state) => {
    state.cargoSchema = cargoSchema
  }),
  setSelectedAir: (air) =>
    set((state) => {
      state.selectedAir = air
    }),
}))
