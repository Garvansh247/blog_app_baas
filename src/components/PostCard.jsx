import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
function PostCard({
    $id,
    title,
    content,
    author,
    createdAt,
    featuredImage,
}) {
    return (
        <div>
            <Link to={`/post/${$id}`} className="block bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                {featuredImage && (
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-300 mb-2">{title}</h2>
                    <p className="text-gray-500 text-sm mb-4">By {author} on {new Date(createdAt).toLocaleDateString()}</p>
                    <p className="text-gray-400">{content.length > 100 ? content.substring(0, 100) + "..." : content}</p>
                </div>
            </Link>
        </div>
    )
}

export default PostCard;