import {Modal} from 'antd'
import {useEffect, useMemo} from 'react'
import {adminStore, getAdminStoreActions} from '../hooks/admin_store'
import {adminActions} from '../utils/admin_actions'
import {AdminForm} from './admin_form'

const as = getAdminStoreActions()

export const AdminModal = () => {
  useEffect(() => {
    // init modal to closed. ex: if an admin changes selected air,
    // then a new instance of this modal renders, and it will be closed
    as.setEditObj(undefined)
  }, [])

  const isOpen = adminStore(
    (s) => (s.editObj ? true : false),
  )

  const form = useMemo(() => {
    return isOpen ? (
      <Modal
        visible={true}
        footer={null}
        onCancel={() => adminActions().closeEditModal()}
        centered
        closable={false}
      >
        <AdminForm />
      </Modal>
    ) : null
  }, [isOpen])

  return form
}
