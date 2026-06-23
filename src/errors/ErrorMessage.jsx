import './Errors.scss';
import { DotLottiePlayer } from '@dotlottie/react-player';

const ErrorMessage = () => {
    return (
        <div className="error">
            <DotLottiePlayer
                src='/error-icon.lottie'
                className="error__icon"
                autoplay
                loop></DotLottiePlayer>
            <h4 className="error__title">Oops, something went wrong...</h4>
            <p className="error__text">Failed to load movies. Please check your internet connection or try again later.</p>
        </div>
    )
}
export default ErrorMessage;