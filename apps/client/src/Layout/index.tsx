import React from 'react'
import { SubmitNavigate, LayoutWrapper, Notification } from 'uicore'
import { useAuthProvider } from '../contextapi/AuthProvider'
import { NotificationType } from '../lib/reducers/authreducer'



type LayoutProps = {
  children: React.ReactNode
  className?: string
  viewOverlay?: boolean,
  notification?: NotificationType,
  submitVote?: () => void,
  isVoteLoading?: boolean,
  activate?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const Layout = ({ children, activate,className, viewOverlay, submitVote, notification, isVoteLoading, ...props }: LayoutProps) => {
  const { AuthState } = useAuthProvider();

  return (
    <>
      <LayoutWrapper
        viewOverlay={viewOverlay}
        {...props}
        Navbar={
          <SubmitNavigate
            activate={activate as boolean}
            isVoteLoading={isVoteLoading as boolean}
            handleSubmit={submitVote}
            src={(AuthState.credentials?.providerData && AuthState.credentials.providerData[0]?.photoURL) as string}
          />}
      >
        {

          notification?.map((item, index) => (

            <div
              key={index}
              style={{
                position: "fixed",
                bottom: "20px",
                transform: `${item.transform ? "translateY(0)" : "translateY(100vh)"}`,
                zIndex: 300,
                backgroundColor: "white",
                borderRadius: "100px",
                transition: "all 0.6s ease-in-out",
              }}
            >
              <Notification
                onClose={item.dispatch}
                isClose={item.isClose}
                noteText={item.noteText}
                status={item.status}
                hexColor={item.hexColor}
                style={{
                  gridTemplateColumns: "38px 70% 38px",
                  padding: "8px 10px",
                }}
              />
            </div>

          ))
        }
        {children}
      </LayoutWrapper>
    </>
  )
}

export default Layout