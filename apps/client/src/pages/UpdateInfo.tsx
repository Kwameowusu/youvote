import { PushBack, Spinner, UpdateForm } from 'uicore'
import { Input } from 'uicore'
import { ElectCard, } from 'uicore'
import { Button } from 'uicore'
import Layout from '../Layout'

import { AuthActionType } from '../lib/reducers/authreducer'
import useUpdateinfo from '../lib/hooks/useUpdateinfo'



export const UpdateInfo = () => {
  const {
    uploadProfilePhoto,
    BannerOnChange,
    logOut,
    AuthState,
    AuthDispatch,
    updateCredentials,
    notification
  } = useUpdateinfo()



  return (
    <>
      <Layout style={{ gap: "30px" }} notification={notification} >

        <PushBack style={{ marginTop: "40px" }} />
        <ElectCard
          isCompressing={AuthState.isCompressing}
          isNoFile={AuthState.noFile}
          isLoading={AuthState.isFileLoading}
          portfolio='Update Infomation'
          profileUrl={AuthState.credentials?.providerData && AuthState.credentials.providerData[0]?.photoURL as string}
          isProfileUpdate={true}
          handleUpdateProfile={uploadProfilePhoto}
          onFileChange={(e) => BannerOnChange(e)}
          aFile={AuthState.profileImage as File}
        />
        <UpdateForm onSubmit={(e) => {
          updateCredentials(e, AuthActionType.username)
        }} >
          <Input type="text" placeholder="Enter username" value={AuthState.username || ""} onChange={(e) => AuthDispatch({ type: AuthActionType.username, payload: e.target.value })} required isFullwidth />
          <Button disabled={AuthState.isFieldLoading && Boolean(AuthState.username)} isFullwidth >
            {
              AuthState.isFieldLoading && AuthState.username ? <Spinner /> : "Update"
            }
          </Button>
        </UpdateForm>

        <UpdateForm onSubmit={(e) => { updateCredentials(e, AuthActionType.email) }} >
          <Input type="text" placeholder="Enter email" value={AuthState.email || ""} onChange={(e) => AuthDispatch({ type: AuthActionType.email, payload: e.target.value })} required isFullwidth />
          <Button isFullwidth >
            Update
          </Button>
        </UpdateForm>
        <UpdateForm onSubmit={(e) => { updateCredentials(e, AuthActionType.password) }} >
          <Input type="text" placeholder="Enter password" value={AuthState.password || ""} onChange={(e) => AuthDispatch({ type: AuthActionType.password, payload: e.target.value })} required isFullwidth />
          <Button isFullwidth >
            Update
          </Button>
        </UpdateForm>
        <UpdateForm onSubmit={logOut} title='Logout' style={{ paddingBottom: "60px" }} >
          <Button isFullwidth style={{ background: "var(--yov-error-color)" }} >
            Logout
          </Button>
        </UpdateForm>
      </Layout>
    </>
  )
}

