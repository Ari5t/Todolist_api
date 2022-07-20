import { useEffect } from "react"

import { socket } from "../../modules/io";

type Listener = (...args: any[]) => void

export const useSocket = (eventName: string, listener: Listener, deps: React.DependencyList = []): void => {
  useEffect(() => {
    socket.on(eventName, listener)

    return () => {
      socket.off(eventName, listener)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}