import { useContext } from "react"
import NotifContext from "../contexts/notifContext"

export const useNotif = () => (useContext(NotifContext))