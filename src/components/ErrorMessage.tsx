const ErrorMessage = ({ message } : { message: string | undefined }) => (message && <p className='text-red-500 text-sm'>{message}</p>)
export default ErrorMessage;