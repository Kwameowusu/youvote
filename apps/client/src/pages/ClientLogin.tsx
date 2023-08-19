
import { LoginForm } from 'uicore'
import Layout from '../Layout'
import { useLogin } from '../lib/hooks/useLogin'
import { AuthActionType } from '../lib/reducers/authreducer'

export function ClientLogin() {

  const { SubmitData, AuthDispatch, AuthState } = useLogin()

  return (
    <>

      <Layout
        notification={[
          {
            dispatch: () => {
              AuthDispatch({ type: AuthActionType.isLoginError, payload: false });
            },
            isClose: true,
            noteText: "Oops :) invalid credentials",
            status: 'error',
            hexColor: '#900b0b',
            transform: AuthState.isLoginError,
          }
        ]}
      >
        <LoginForm
          isLoading={AuthState.isLoading}
          title='Youvote voting App'
          email={AuthState.email}
          password={AuthState.password}
          setemail={(e) => {
            AuthDispatch({ type: AuthActionType.email, payload: e.target.value })
          }}
          setpassword={(e) => {
            AuthDispatch({ type: AuthActionType.password, payload: e.target.value })
          }}
          handleSubmit={SubmitData}
        />
      </Layout>
    </>
  )
}

ClientLogin.displayName = 'ClientLogin'


