import {Mac} from './mac'
import {renderWrapped, waitFor} from '../testUtils/render_wrapped'
import MatchMediaMock from 'jest-matchmedia-mock'
import { CargoStore } from '../hooks/cargo_store'

describe('Mac', () => {
  let matchMedia
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   beforeAll(() => (matchMedia = new MatchMediaMock()))

  it('will render', async () => {
    const ct = renderWrapped(<Mac/>)

    await waitFor(() => expect(ct.queryAllByText('Loading Test').length).toBe(0))
    expect(ct.getByText('Tank 1: 250')).toBeInTheDocument()
  }) 

  it('will init state on first render', async () => {
    // given
    CargoStore.getState().resetCargoStore()
    expect(CargoStore.getState().cargoMap.size).toBe(0)
    const {queryAllByText} = renderWrapped(<Mac/>)
    await waitFor(() => expect(queryAllByText('Loading Test').length).toBe(0))

    await waitFor(() => {
      expect(Array.from(CargoStore.getState().cargoMap.values()).length).toBe(5)
  })
})
})