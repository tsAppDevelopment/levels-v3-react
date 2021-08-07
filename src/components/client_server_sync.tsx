import {Button, Modal} from 'antd'
import {SyncOutlined} from '@ant-design/icons'
import {useMemo, useState} from 'react'
import {useTick} from '../hooks/use_tick'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import {v4} from 'uuid'
import { CacheState, UseOfflineCache } from '../hooks/use_offline_cache'

const colorMap: Record<CacheState ,string> = {
  [CacheState.OUTDATED]: '#FF4D50',
  [CacheState.FETCHING]: '#FF6D12',
  [CacheState.UPDATABLE]: '#F8aD14',
  [CacheState.OFFLINE]: '#1890FF',
  [CacheState.SYNCED]: '#52C419'
}

const getLastSyncedFromNowString = () => {
 try{
  return formatDistanceToNowStrict(
    Number(
      localStorage.getItem('lastSync')
    )
  )
 } catch(e) {
  return 'an unknown amount of time'
 }
}

export const ClientServerSync = () => {
  const [isOpen, setIsOpen] = useState(false)
  useTick(1000)
  const {stateSelector, pollComponent, syncNow} = UseOfflineCache()
  const state = stateSelector()
  const color = colorMap[state]

  const syncButton = state !== CacheState.UPDATABLE ? null : (
    <Button
      data-testid="client sync but"
      onClick={syncNow}
    >
      Sync Now
    </Button>
  )

  const modalButton = useMemo(() => {
    return (
      <Button
        data-testid={color}
        style={{backgroundColor: color, borderColor: color}}
        size={'small'}
        type="primary"
        shape="circle"
        icon={<SyncOutlined />}
        onClick={() => setIsOpen(true)}
      />
    )
  }, [color])

    return (
      <>
        {pollComponent}
        {isOpen ? (
          <Modal
            visible={true}
            footer={null}
            onCancel={() => setIsOpen(false)}
            closable={false}
            centered
          >
            <div key={v4()}>
              <p>{`${state}, last synced ${getLastSyncedFromNowString()} ago`}</p>
              {syncButton}
            </div>
          </Modal>
        ) : null}
        {modalButton}
      </>
    )
}
