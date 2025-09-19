import { Card } from '@/components/ui/card';
import React from 'react'

type Props = React.PropsWithChildren<{
    title: string;
    action?: React.ReactNode;
}>

const Itemslist = ({children,action:Action,title}: Props)=> {
  return(
     <Card className='h-[95vh] w-full lg:flex-none lg:w-80 p-2'>
    <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>{title}</h1>
        {Action?Action:null}
    </div>
    <div className='w-full h-full flex flex-col items-center gap-2'>
        {children}
    </div>
  </Card>
  );
}

export default Itemslist;