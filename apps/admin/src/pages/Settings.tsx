import { AddUserBar, AddUserFrom, Button, Spinner, UsersGroup } from "uicore"
import Layout from "../Layout"
import { useState } from "react"
import { useAddUser } from "../lib/hooks/useAddUser"
import { UserActionType, aUserType } from "../lib/reducers/user-reducer/UserInitialData"
import { GetRequest } from "../lib/request/GetRequest"



const Settings = () => {
  const [show, setShow] = useState(false)

  const { submitUser, addActivate, UserState, UserDispatch, notification, confirmations } = useAddUser()

  const { userData } = GetRequest(`${import.meta.env.VITE_API_URL}/get-users`)





  return (
    <>
      <Layout
        viewOverlay={show || UserState.isDeleteModalOpen}
        style={{ gap: "30px" }}
        notification={notification}
        confirmations={confirmations}
      >
        <AddUserBar handleAdduser={() => { setShow(!show) }} show={show} />
        <Button size="large" onClick={() => { addActivate(!UserState.election?.state) }} isFullwidth
          style={{
            border: "1px solid",
            background: UserState.election?.state ? 'var(--yov-error-color)' : 'var(--yov-success-color)'
          }}
          disabled={UserState.isActivateLoading}
        >
          {
            UserState.isActivateLoading ?
              <Spinner style={{ marginRight: "10px" }} /> :
              <>
                {
                  UserState.election?.state ?

                    "Deactivate Elections" : "Activate Elections"
                }
              </>
          }

        </Button>
        {
          show ?
            <AddUserFrom
              onSubmit={submitUser}
              selectedValue={UserState.role}
              handleSelectChange={(e) => {
                UserDispatch({ type: UserActionType.role, payload: e.target.value })
              }}
              isUserLoading={UserState.isUserLoading}
              email={UserState.email}
              password={UserState.password}
              handleEmailChange={(e) => { UserDispatch({ type: UserActionType.email, payload: e.target.value }) }}
              handlePasswordChange={(e) => { UserDispatch({ type: UserActionType.password, payload: e.target.value }) }}
            /> : null
        }

        {
          userData ?
            <UsersGroup
              usersList={userData && Array.isArray(userData?.users) && userData?.users?.map((item: any) => ({
                fuid: item.uid,
                name: item.displayName,
                email: item.email,
                role: item.customClaims && item.customClaims.role
              }))}
              handleDelete={(getUser) => {
                UserDispatch({ type: UserActionType.aUser, payload: getUser as aUserType })
                UserDispatch({ type: UserActionType.isDeleteModalOpen, payload: true })
              }}
              fetchUsers={() => { }}
            /> : <Spinner style={{ marginTop: "200px" }} />
        }

      </Layout>
    </>
  )
}

export default Settings