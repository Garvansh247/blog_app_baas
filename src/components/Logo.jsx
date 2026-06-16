import myLogo from "../assets/logoipsum-374.svg";

function Logo({ width="100px" }) {
    return (
        <div style={{ width }} className="logo flex items-center justify-center">
            <img src={myLogo} alt="Logo" className="w-full h-auto" />
        </div>
    )
}

export default Logo;