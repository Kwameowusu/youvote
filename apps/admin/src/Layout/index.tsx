import React from 'react'
import { LayoutWrapper, Notification, Navigation, Users, CogIcon, UserAdd, Clipboard, DeleteItemModal } from 'uicore'
import { useAuthProvider } from '../contextapi/AuthProvider'
import { NotificationType } from '../lib/reducers/auth-reducer'



type LayoutProps = {
  children: React.ReactNode
  viewOverlay?: boolean,
  notification?: NotificationType
  confirmations?: Array<{ transform: boolean, handleDelete: () => void, handleClose: () => void, isDeleting:boolean }>
} & React.HTMLAttributes<HTMLDivElement>

const Layout = ({ children, viewOverlay, notification, confirmations, ...props }: LayoutProps) => {
  const {  AuthState } = useAuthProvider();

  return (
    <>
      <LayoutWrapper
        viewOverlay={viewOverlay}
        {...props}
        Navbar={
          <Navigation
            allRoutes={allRoutes}

            src={AuthState.credentials?.providerData && AuthState.credentials.providerData[0]?.photoURL as string}
          />
        }
      >
        <DeleteItemModal
          confirmations={confirmations}
        />
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

const allRoutes = [
  {
    id: "1",
    path: "/",
    Icon: <UserAdd />
  },
  {
    id: "2",
    path: "/insight",
    Icon: <Clipboard />

  },
  {
    id: "2",
    path: "/candidates",
    Icon: <Users />

  },
  {
    id: "2",
    path: "/settings",
    Icon: <CogIcon />

  },
]

export default Layout