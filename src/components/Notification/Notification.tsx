import React, { useState, useEffect } from "react"
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid"
import { Notification } from "./type"

function NotificationMessage({ type = "info", message }: Notification) {
  const [isVisible, setIsVisible] = useState(true)

  const typesStyle = {
    info: "w-80 bg-blue-100 border-1-4 border-blue-500 text-blue-700",
    warning: "w-80 bg-yellow-100 border-1-4 border-yellow-500 text-yellow-700",
    success: "w-80 bg-green-100 border-1-4 border-green-500 text-green-700",
    error: "w-80 bg-red-100 border-1-4 border-red-500 text-red-700",
  }

  const icons = {
    info: <InformationCircleIcon className="w-6 h-6 text-blue-500" />,
    warning: <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />,
    success: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
    error: <XCircleIcon className="w-6 h-6 text-red-500" />,
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`relative p-4 mb-4 flex items-center rounded-md ${typesStyle[type]}`}
    >
      <div className="flex items-center">
        <span className="mr-2">{icons[type]}</span>
        <span>{message}</span>
      </div>
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
        onClick={() => {
          setIsVisible(false)
        }}
      >
        X
      </button>
    </div>
  )
}

export default NotificationMessage
