import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import moment from 'moment'
import ViewReportDialog from './ViewReportDialog'
import { SessionDetails } from './HistoryList'

type Props = {
  historyList: SessionDetails[]
}

function HistoryTable({ historyList }: Props) {
  const [showAll, setShowAll] = useState(false)

  // Decide how many records to show
  const displayedRecords = showAll ? historyList : historyList.slice(0, 5)

  return (
    <div>
      <Table className='mt-5'>
        <TableCaption>Previous Consultation Report</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">AI Medical Specialist</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {displayedRecords.map((record: SessionDetails, index: number) => (
            <TableRow key={index} className='hover:bg-slate-200 dark:hover:bg-slate-800 '>
              <TableCell className="font-medium ">
                {record.selectedDoctor.specialist}
              </TableCell>
              <TableCell>{record.notes}</TableCell>
              <TableCell>{moment(new Date(record.createdOn)).fromNow()}</TableCell>
              <TableCell className="text-right">
                <ViewReportDialog record={record}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Show button only if more than 10 records exist */}
      {historyList.length > 5 && (
        <div className="flex justify-center mt-4 ">
          <Button
            className='bg-green-500 hover:bg-green-400 cursor-pointer'
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View More"}
          </Button>
        </div>
      )}
    </div>
  )
}

export default HistoryTable
