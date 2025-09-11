import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetails } from '../medical-agent/[sessionId]/page'

type Props = {
  record: SessionDetails
}

function ViewReportDialog({ record }: Props) {
  const report = record.report as any; // typecast because DB JSON type

  if (!report) {
    return (
      <Button disabled className="bg-gray-400 text-white">
        No Report Available
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-blue-600 text-white hover:bg-blue-500 cursor-pointer">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-center text-2xl font-bold mb-4">
              Medical AI Voice Agent Report
            </h2>
          </DialogTitle>
          <DialogDescription>
            <div className="max-h-[500px] overflow-y-auto space-y-6">

              {/* Session Info */}
              <section>
                <h3 className="font-bold text-blue-500 text-lg mb-2">Session Info</h3>
                <hr className="bg-blue-600 mb-3" />
                <p><span className="font-semibold">Session ID:</span> {report.sessionId}</p>
                <p><span className="font-semibold">Agent:</span> {report.agent}</p>
                <p><span className="font-semibold">User:</span> {report.user}</p>
                <p><span className="font-semibold">Timestamp:</span> {new Date(report.timestamp).toLocaleString()}</p>
              </section>

              {/* Chief Complaint */}
              <section>
                <h3 className="font-bold text-blue-500 text-lg mb-2">Chief Complaint</h3>
                <hr className="bg-blue-600 mb-3" />
                <p>{report.chiefComplaint}</p>
              </section>

              {/* Summary */}
              <section>
                <h3 className="font-bold text-blue-500 text-lg mb-2">Summary</h3>
                <hr className="bg-blue-600 mb-3" />
                <p>{report.summary}</p>
              </section>

              {/* Symptoms */}
              {report.symptoms?.length > 0 && (
                <section>
                  <h3 className="font-bold text-blue-500 text-lg mb-2">Symptoms</h3>
                  <hr className="bg-blue-600 mb-3" />
                  <ul className="list-disc ml-6">
                    {report.symptoms.map((s: string, idx: number) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Duration + Severity */}
              <section>
                <h3 className="font-bold text-blue-500 text-lg mb-2">Condition Details</h3>
                <hr className="bg-blue-600 mb-3" />
                <p><span className="font-semibold">Duration:</span> {report.duration}</p>
                <p><span className="font-semibold">Severity:</span> {report.severity}</p>
              </section>

              {/* Medications */}
              {report.medicationsMentioned?.length > 0 && (
                <section>
                  <h3 className="font-bold text-blue-500 text-lg mb-2">Medications Mentioned</h3>
                  <hr className="bg-blue-600 mb-3" />
                  <ul className="list-disc ml-6">
                    {report.medicationsMentioned.map((m: string, idx: number) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Recommendations */}
              {report.recommendations?.length > 0 && (
                <section>
                  <h3 className="font-bold text-blue-500 text-lg mb-2">Recommendations</h3>
                  <hr className="bg-blue-600 mb-3" />
                  <ul className="list-disc ml-6">
                    {report.recommendations.map((r: string, idx: number) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </section>
              )}

            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ViewReportDialog
