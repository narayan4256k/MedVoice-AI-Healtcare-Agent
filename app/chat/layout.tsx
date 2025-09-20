import React from 'react'
import SideBarWrapper from './components/shared/sidebar/SideBarWrapper'

type Props = React.PropsWithChildren<{}>

const layout = ({children}: Props) => {
  return (
    <SideBarWrapper>{children}</SideBarWrapper>
  )
}

export default layout