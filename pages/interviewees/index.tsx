import { Switch } from "@headlessui/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { HiBadgeCheck, HiPlus, HiPlusSm } from "react-icons/hi"
import Layout from "../../components/layout"
import Spinner from "../../components/spinner"
import { getAverage, getEvaluationAverage } from "../../services/getAverage"
import { request } from "../../services/request"
import TokenService from "../../services/token.service"

const Interviewees = () => {
  const router = useRouter()
  const tokenservice = new TokenService()
  const [interviewees, setInterviewees] = useState<InterviewParticipant[]>([])
  const [query, setQuery] = useState("")
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const token = await tokenservice.getToken()
      const data = await request<InterviewParticipant[]>("GET", {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
        path: "participants",
        token,
      })
      setInterviewees(data)
    }

    getData()
  }, [])

  return (
    <Layout>
      <div className="h-full w-full overflow-y-auto px-4 py-2">
        <div className="mb-3 flex flex-col items-start justify-center">
          <div className="mb-3 flex w-full items-center justify-center gap-x-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search..."
              className="w-full rounded-md bg-slate-100 px-3 py-1.5 text-sm outline-none dark:bg-slate-700"
            />
            <button
              onClick={() => router.push("/exercises/form")}
              className="flex w-max min-w-max items-center justify-center rounded-md bg-soft-green px-3 py-1.5 text-sm text-white outline-none hover:bg-soft-green-dark"
            >
              <HiPlusSm className="mr-1" />
              New Interviewee
            </button>
          </div>
        </div>
        {interviewees.length === 0 ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 gap-x-4 gap-y-3">
            {interviewees
              .sort((a, b) => {
                return (
                  new Date(a.interviewAt).getTime() -
                  new Date(b.interviewAt).getTime()
                )
              })
              .filter((participant) =>
                participant.displayName
                  .toLocaleLowerCase()
                  .includes(query.toLocaleLowerCase())
              )
              .map((participant) => (
                <div
                  className={`flex flex-col items-start justify-center rounded-md bg-slate-100 py-2 px-3 text-sm dark:bg-slate-700
              `}
                  key={participant.id}
                >
                  <div className="flex flex-col items-start justify-center text-base font-medium">
                    <p className="text-lg font-semibold">
                      {participant.displayName}
                    </p>
                    <p className="-mt-1 text-sm font-light opacity-60">
                      {participant.email}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-soft-green">
                      {new Date(participant.interviewAt).toLocaleString(
                        "hu-HU"
                      )}
                    </p>
                  </div>
                  {participant.evaluation.length !== 0 && (
                    <div className="mt-3 flex bg-soft-green text-white">
                      {getEvaluationAverage(
                        participant.evaluation.map((evaluation) => {
                          return getAverage({ ...evaluation })
                        })
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Interviewees
