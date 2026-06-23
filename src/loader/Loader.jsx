import { PulseLoader } from "react-spinners";
import './Loader.scss';

const Loader = () => {
    return (
        <div className="loader">
            <PulseLoader color="#2563eb" size={15} margin={5} />
        </div>
    )
}

export default Loader;