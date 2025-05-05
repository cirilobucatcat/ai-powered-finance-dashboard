const ErrorMessage = ({ message } : { message: string | undefined }) => (message && <p className='text-red-500 text-xs font-medium my-1'>{message}</p>)
export default ErrorMessage;