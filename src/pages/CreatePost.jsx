import { Container,PostForm } from "../components";

function CreatePost() {
    return (
        <Container>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold text-gray-300 mb-4">Create New Post</h1>
                <PostForm />
            </div>
        </Container>
    );
}

export default CreatePost;