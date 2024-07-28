//@ts-check

"use client"
import useErrorMessage from "@/client/hooks/useErrorMessage"
import useSuccessMessage from "@/client/hooks/useSuccessMessage"
import React from "react"

const LandingPageViews = () => {

    const ErrorMessage = useErrorMessage()
    const SuccessMessage = useSuccessMessage()

    React.useEffect(()=>{
        ErrorMessage(new Error("error message"))
        SuccessMessage("Success message")
    })
    return (
        <></>
    )
}

export default LandingPageViews