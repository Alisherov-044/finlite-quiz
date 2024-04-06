import { Icons } from "@/components";
import { Upload, type UploadProps } from "antd";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";

export type ImageUploadProps = UploadProps & {
    onChange: (
        name: UploadChangeParam<UploadFile<string>>,
        value: string
    ) => void;
};

export function ImageUpload({ onChange }: ImageUploadProps) {
    return (
        <Upload
            onChange={onChange}
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        >
            <button className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gray-200">
                <Icons.imgUpload />

                <span className="flex items-center justify-center absolute bottom-0 right-0 w-5 h-5 rounded-full border-[3px] border-white text-white bg-gray-300 font-extrabold">
                    +
                </span>
            </button>
        </Upload>
    );
}
