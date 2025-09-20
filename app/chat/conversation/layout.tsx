import React from 'react'
import Itemslist from '../components/shared/items-list/itemslist'

type Props = React.PropsWithChildren<{}>

const ConversationsLayout = ({children}: Props) => {
  return (
    <>
    <Itemslist title='Conversations'>Conversations Page</Itemslist>
    {children}
    </>
  )
}

export default ConversationsLayout