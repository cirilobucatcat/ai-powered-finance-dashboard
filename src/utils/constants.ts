import { ToasterProps } from "react-hot-toast";

export const customToasterProps: ToasterProps = {
    position: 'top-center',
    toastOptions: {
        className: '',
        style: {
            backgroundColor: '#0f172b',
            color: '#cfff04',
            borderRadius: '0.5rem'
        }
    }
}