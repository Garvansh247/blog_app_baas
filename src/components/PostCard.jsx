import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import parse, { domToReact } from "html-react-parser";

function PostCard({
    $id,
    title,
    content,
    featuredImage,
}) {
    const previewImage = featuredImage ? appwriteService.getFilePreview(featuredImage) : null;
    const previewContent = parse(content, {
        replace(domNode) {
            if (domNode?.name === "a") {
                return (
                    <span className="text-blue-400 underline">
                        {domToReact(domNode.children)}
                    </span>
                );
            }
            return undefined;
        },
    });

    return (
        <article className="h-full">
            <Link
                to={`/post/${$id}`}
                className="flex h-full flex-col overflow-hidden rounded-xl bg-gray-800 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
                {previewImage && (
                    <img
                        src={previewImage}
                        alt={title}
                        className="h-48 w-full object-cover"
                    />
                )}
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-300 mb-2">{title}</h2>
                    <div
                        className="overflow-hidden text-gray-400"
                        style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                        }}
                    >
                        {previewContent}
                    </div>
                </div>
            </Link>
        </article>
    )
}

export default PostCard;