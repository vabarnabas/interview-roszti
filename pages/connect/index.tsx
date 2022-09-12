import { useRouter } from "next/router"
import React, { useEffect } from "react"
import TokenService from "../../services/token.service"

const Connect = () => {
  const tokenservice = new TokenService()
  const router = useRouter()

  const { t: token } = router.query

  useEffect(() => {
    if (token) {
      tokenservice.saveToken(Array.isArray(token) ? token[0] : token)
      router.push("/")
    }
  }, [token, router.isReady])

  return <div></div>
}

export default Connect
