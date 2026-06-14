import { Controller } from "react-hook-form";
import { Editor } from '@tinymce/tinymce-react';


function RTE({
    control,
    defaultValue="",
    label,
    name,
}){
    return (
        <div className="w-full mb-4 flex flex-col gap-2">
            {label &&
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor={name}>
                    {label}
                </label>
            }
            <Controller
                control={control}
                name={name || "content"}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='729kob67mxfb360c1qjytwqu17ettm4us0s8w7t3f1du8bmk'
                        init={{
                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                        }}
                        initialValue={defaultValue}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}