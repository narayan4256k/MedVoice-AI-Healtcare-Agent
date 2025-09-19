import React from 'react'
import Itemslist from '../components/shared/items-list/itemslist'
import ConversationFallback from '../components/shared/conversation/ConversationFallback'

type Props = {}

const doctorsPage = (props: Props) => {
  return (
    <><Itemslist title='Doctors'>Doctors Page</Itemslist>
    <ConversationFallback/>
    </>
  )
}

export default doctorsPage