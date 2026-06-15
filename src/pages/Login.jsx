import {Container } from "../components";
import LoginComponent from "../components/login/Login";

function Login(){
    return (
        <Container>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold text-gray-300 mb-4">Login to your account</h1>
                <LoginComponent />
            </div>
        </Container>
     )
}

export default Login;