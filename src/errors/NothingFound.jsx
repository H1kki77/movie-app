import { DotLottiePlayer } from '@dotlottie/react-player';

const NothingFound = ({ text }) => {
    return (
        <div className="error">
            <DotLottiePlayer
                src='/error-icon.lottie'
                className="error__icon"
                autoplay
                loop></DotLottiePlayer>
            <h4 className="error__title">{text}</h4>
        </div>
    )
}
export default NothingFound;