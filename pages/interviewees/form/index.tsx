import React, { Fragment, SyntheticEvent, useEffect, useState } from "react"
import Layout from "../../../components/layout"
import TokenService from "../../../services/token.service"
import Spinner from "../../../components/spinner"
import { HiCheckCircle } from "react-icons/hi"
import { useRouter } from "next/router"
import { request } from "../../../services/request"

const IntervieweeForm = () => {
  const tokenservice = new TokenService()
  const router = useRouter()
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [interviewAt, setInterviewAt] = useState("")
  const [error, setError] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const { id } = router.query

  useEffect(() => {
    const getData = async () => {
      const token = await tokenservice.getToken()
      const data = await request<InterviewParticipant>("GET", {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
        path: `participants/${id}`,
        token,
      })
      if (data && data.displayName && data.email && data.interviewAt) {
        setDisplayName(data.displayName)
        setEmail(data.email)
        setInterviewAt(new Date(data.interviewAt).toISOString())
      }
    }

    if (id && typeof id === "string") {
      getData()
    }
  }, [id, router.isReady])

  console.log(interviewAt)

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setError("")

    const token = await tokenservice.getToken()
    try {
      await request<InterviewParticipant>("POST", {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
        path: "participants",
        token,
        body: JSON.stringify({
          displayName,
          email,
          interviewAt: new Date(interviewAt).toISOString(),
        }),
      })
      router.push("/interviewees")
    } catch {
      setError("Something went wrong")
    }
  }

  const handleSelection = (id: string) => {
    selectedCategories.includes(id)
      ? setSelectedCategories(
          selectedCategories.filter((category) => category !== id)
        )
      : setSelectedCategories([...selectedCategories, id])
  }

  return (
    <Layout>
      <div className="h-full w-full px-4 py-2">
        <form action="" onSubmit={(e) => onFormSubmit(e)} className="space-y-3">
          <div className="">
            <p className="mb-0.5 pl-1 text-xs text-soft-green">
              Full Name<span className="text-rose-500">*</span>
            </p>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              type="text"
              className="w-full rounded-md bg-slate-100 px-3 py-1.5 text-sm outline-none dark:bg-slate-700"
              required
            />
          </div>
          <div className="">
            <p className="mb-0.5 pl-1 text-xs text-soft-green">
              E-mail<span className="text-rose-500">*</span>
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-md bg-slate-100 px-3 py-1.5 text-sm outline-none dark:bg-slate-700"
              required
            />
          </div>
          <div className="">
            <p className="mb-0.5 pl-1 text-xs text-soft-green">
              Interview Time<span className="text-rose-500">*</span>
            </p>
            <input
              value={interviewAt}
              onChange={(e) => setInterviewAt(e.target.value)}
              type="datetime-local"
              className="w-full rounded-md bg-slate-100 px-3 py-1.5 text-sm outline-none dark:bg-slate-700"
              required
            />
            {error && (
              <p className="mt-1.5 pl-1 text-xs text-rose-500">{error}</p>
            )}
          </div>
          <button className="w-full rounded-md bg-soft-green px-3 py-1.5 text-sm text-white outline-none hover:bg-soft-green-dark">
            Create
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default IntervieweeForm
