'use client'
import { Field } from 'formik';
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface ImagePreviewProps {
    files: File[];
    setSelectedFiles: (files: File[]) => void;
}

const ImagePreviewProduct: React.FC<ImagePreviewProps> = ({files,setSelectedFiles}) => {
    const [preview, setPreview] = useState<string | null>(null);

    // const onRemove = () => {
    //     setSelectedFiles([]);
    //     setPreview(null);
    // };

    useEffect(() => {
        if (files.length > 0) {
            const previewUrl = URL.createObjectURL(files[0]);
            setPreview(previewUrl);
        } else {
            setPreview(null);
        }
    }, [files]);

    return (
        <section>
            <div className="flex gap-2">
                {preview && (
                    <div className="relative">
                        <Image
                            src={preview}
                            alt="preview"
                            width={300}
                            height={300}
                            className="h-full w-1/2 rounded-md object-cover"
                        />
                        {/* <button
                            type="button"
                            onClick={onRemove}
                            className="absolute right-1 top-1 rounded-full bg-black bg-opacity-60 p-[2px] text-xl text-white hover:bg-opacity-45"
                        >
                            <IoCloseOutline className="h-4 w-4" />
                        </button> */}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ImagePreviewProduct;