import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { clearError, selectErrorMessage } from '../../redux/slices(modern appr)/errorSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
function Error() {
  const errorMassage = useSelector(selectErrorMessage)

  const dispatch = useDispatch()

  // When error message changes toat.info appears (after rendering component and DOM itself)
  useEffect(() => {
    if (errorMassage) {
      toast.info(errorMassage)
      dispatch(clearError())
    }
  }, [errorMassage, dispatch])
  return <ToastContainer position='top-right' autoClose={5000} />
}
export default Error
