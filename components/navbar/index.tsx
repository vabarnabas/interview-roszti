import { Menu, Transition } from "@headlessui/react"
import React, { Fragment, useEffect, useState } from "react"
import {
  HiChartSquareBar,
  HiChevronDown,
  HiCog,
  HiCollection,
  HiDocument,
  HiFolder,
  HiIdentification,
  HiLockClosed,
  HiUserCircle,
  HiUserGroup,
} from "react-icons/hi"
import { BiDumbbell } from "react-icons/bi"
import { FaStickyNote } from "react-icons/fa"
import { useRouter } from "next/router"
import TokenService from "../../services/token.service"
// import { useClient } from "workout-tracker-client"
// import { User } from "workout-tracker-client/dist/types"

const Navbar = () => {
  const router = useRouter()
  // const client = useClient(process.env.NEXT_PUBLIC_API_URL || "")
  const [currentUser, setCurrentUser] = useState({})
  const tokenservice = new TokenService()

  useEffect(() => {
    const getData = async () => {
      const token = await tokenservice.getToken()
      // const userData = await client.getCurrentUser({ token })
      // setCurrentUser(userData)
    }

    getData()
  }, [])

  const menuOptions = [
    {
      title: "Interviewees",
      action: () => {
        router.push("/collections")
      },
      active: true,
      icon: <HiUserGroup />,
    },
    {
      title: "Reviews",
      action: () => {
        router.push("/plans")
      },
      active: true,
      icon: <HiDocument />,
    },
    {
      title: "Settings",
      action: () => {
        router.push("/settings")
      },
      active: true,
      icon: <HiCog />,
    },
    {
      title: "Logout",
      action: () => {
        tokenservice.deleteToken()
        router.push("/login")
      },
      active: true,
      icon: <HiLockClosed />,
    },
  ]

  return (
    <div className="fixed inset-x-0 top-0 flex h-12 items-center justify-between gap-x-4 px-4 dark:bg-slate-700">
      <div
        onClick={() => router.push("/")}
        className="flex cursor-pointer items-center justify-center"
      >
        <HiChartSquareBar className="text-3xl text-soft-green" />
        <p className="ml-2 font-medium">Interview RÖszTI</p>
      </div>
      <div className="z-20 text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="font-mediumhover:bg-opacity-30 inline-flex w-full items-center justify-center rounded-md bg-slate-400 bg-opacity-20 px-3 py-1.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:bg-slate-600">
              <HiChevronDown className="mr-1 text-base" />
              Menu
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 origin-top-right rounded-md bg-slate-100 shadow-lg focus:outline-none dark:bg-slate-600">
              {menuOptions.map((option) => (
                <div key={option.title} className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => option.action()}
                        className={`${
                          active ? "bg-soft-green text-slate-100 " : ""
                        } group flex w-full items-center rounded-md px-2 py-1.5 text-sm`}
                      >
                        <span className="mr-2 text-sm">{option.icon}</span>
                        <p className="">{option.title}</p>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {/* <div className="flex space-x-3 text-sm text-blue-400">
        {menuOptions
          .filter((option) => option.active)
          .map((option) => (
            <p
              key={option.title}
              className="cursor-pointer hover:text-blue-500"
            >
              {option.title}
            </p>
          ))}
      </div> */}
      {/* <Combobox value={selectedQuery} onChange={setSelectedQuery}>
        <div className="relative w-full">
          <Combobox.Input
            className="w-full rounded-md bg-lightGray py-1 px-2 text-sm outline-none"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query.length > 2 && (
            <Combobox.Options className="absolute top-[100%] w-full overflow-hidden rounded-b-md bg-white shadow">
              {queryResult.map((result) => (
                <Combobox.Option className="" key={result.id} value={result.id}>
                  {({ selected, active }) => (
                    <div
                      className={`cursor-pointer px-2 py-1 text-sm ${
                        active ? "bg-lime-500 text-white" : ""
                      }`}
                    >
                      <p className="">
                        {result.displayName}
                        <span
                          className={`${
                            active ? "text-slate-100" : "text-slate-400"
                          }`}
                        >{` in ${result.group}`}</span>
                      </p>
                    </div>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox> */}
    </div>
  )
}

export default Navbar
