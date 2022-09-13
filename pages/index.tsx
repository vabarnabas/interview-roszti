import type { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import Layout from "../components/layout"
import TokenService from "../services/token.service"
import { HiPlusSm } from "react-icons/hi"
import { useRouter } from "next/router"
import Spinner from "../components/spinner"
import { request } from "../services/request"

const Home: NextPage = () => {
  // const client = useClient(process.env.NEXT_PUBLIC_API_URL || "")
  const router = useRouter()
  const tokenservice = new TokenService()
  const [fetching, setFetching] = useState(false)
  const [participants, setParticipants] = useState<InterviewParticipant[]>([])

  useEffect(() => {
    const getData = async () => {
      setFetching(true)
      const token = await tokenservice.getToken()
      // const data = await client.getPosts({ token })
      const data = await request<InterviewParticipant[]>("GET", {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
        path: "participants",
        token,
      })
      setParticipants(data)
      setFetching(false)
    }

    getData()
  }, [])

  return (
    <Layout>
      <div className="h-full w-full overflow-y-auto px-4 py-2">
        <div className="mb-3 flex w-full items-center justify-start gap-x-3">
          <p className="text-2xl font-bold">Upcoming Interviews</p>
        </div>
        {fetching ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 gap-y-3">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="rounded-md bg-slate-100 px-3 py-2 dark:bg-slate-700"
              >
                <p className="text-lg font-semibold">
                  {participant.displayName}
                </p>
                <p className="-mt-1 text-sm">{participant.email}</p>
                <p className="mt-3 text-xs font-semibold text-soft-green">
                  {new Date(participant.interviewAt).toLocaleString("hu-HU")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Home
