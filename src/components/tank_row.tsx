import {Tank} from '../types/aircraftDeep'
import {getUserActions, useCargo, getUserAir} from '../hooks/user_store'
import {CargoString} from '../types/cargoString'
import {getCargoStringFromTank} from '../utils/util'
import {Select} from 'antd'
import {Gauge} from '@ant-design/charts'
import {useMemo, useState} from 'react'

const cs = getUserActions()

export const TankRow = ({
  tank,
  cargoString,
  style
}: {
  tank: Tank
  cargoString: CargoString
  style?: any
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const currentWeight = useCargo(cargoString?.uuid)?.weightEA ?? 0
  const weights = useMemo(() => tank.weightsCSV.split(','), [tank.weightsCSV])
  const maxWeight = weights[weights.length - 1]

  const onChange = (newWeight: string) => {
    // get new cargo string from tank with new index
    // to update fs && weightEA
    // override uuid
    const newIdx = weights.findIndex((w) => w === newWeight)
    const newCargoString = {
      ...getCargoStringFromTank({
        idx: newIdx,
        tank,
        momMultiplyer: getUserAir().momMultiplyer,
      }),
      uuid: cargoString.uuid,
    }

    cs.putCargos([newCargoString])
  }


  const options = useMemo(
    () => weights.map(w => ({
      label: w,
      value: w,
    })),
    
    [weights]
  )

  return (
    <div style={{paddingTop: 10, cursor: 'pointer', ...style}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            color: '#383838',
            fontWeight: 'normal',
            fontSize: '12px',
          }}
        >
          {tank.name}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -5,
        }}
      >
        <div
          onClick={() => setIsEditing(!isEditing)}
          style={{
            width: 75,
            height: 75,
          }}
        >
          {process.env.IS_TEST ? (
            <div>chart</div>
          ) : (
            <Gauge
              percent={Number(currentWeight) / Number(maxWeight)}
              range={{color: 'l(0) 0:#B7D9D7 1:#037C75'}}
              indicator={false}
            />
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -2,
        }}
      >
        <Select
          data-testid={`${tank.name} select`}
          onChange={onChange}
          defaultValue={currentWeight}
          style={{textAlign: 'center', fontSize: 12, width: 60}}
          dropdownStyle={{textAlign: 'center'}}
          showSearch
          size="small"
          showArrow={false}
          bordered={true}
          onDropdownVisibleChange={(open) => setIsEditing(open)}
          open={isEditing}
          showAction={['focus']}
          dropdownMatchSelectWidth={false}
          virtual={true}
          options={options}
        />
      </div>
    </div>
  )
}
