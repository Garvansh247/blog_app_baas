import {Container } from "../components";
import SignupComponent from "../components/signup/Signup.jsx";

function Signup() {
    return (
        <Container>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold text-gray-300 mb-4">Create a new account</h1>
                <SignupComponent />
            </div>
        </Container>
     )
}

export default Signup;