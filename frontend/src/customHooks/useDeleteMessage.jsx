import axios from "axios"
import { serverUrl } from "../main"

const useDeleteMessage = () => {
  const deleteMessage = async (id) => {
    await axios.delete(`${serverUrl}/api/message/delete/${id}`, {
      withCredentials: true,
    })
  }

  return { deleteMessage }
}

export default useDeleteMessage
