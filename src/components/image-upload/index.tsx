import { Icons, ImageUploadUploaded } from "@/components";
import { axiosMedia } from "@/lib";
import { UPLOAD_DELETE_URL, UPLOAD_URL } from "@/utils/urls";
import { Flex, Upload, notification, type UploadProps } from "antd";
import { useMutation } from "react-query";
import { useDispatch, useSelector, useTranslate } from "@/hooks";
import {
    setCurrentUploadedImage,
    setCurrentUploadedImageOrigin,
} from "@/redux/slices/uploadSlice";
import type { UploadRequestOption } from "rc-upload/lib/interface";
import {
    TDeletionRequest,
    TDeletionResponse,
} from "@/components/image-upload-uploaded";
import ImgCrop from "antd-img-crop";
import { LazyLoadImage } from "react-lazy-load-image-component";

export type ImageUploadProps = UploadProps & {
    setUrl: (url: string) => void;
    resetUrl: () => void;
};

export type TImageUpload = {
    id?: number;
    key: string;
    url: string;
    project: string;
};

export type TImageUploadResponse = {
    data: TImageUpload;
};

const IMAGE_UPLOAD_CLIENT = import.meta.env.VITE_IMAGE_UPLOAD_CLIENT;

export function ImageUpload({ setUrl, resetUrl }: ImageUploadProps) {
    const { t } = useTranslate();
    const dispatch = useDispatch();
    const { currentUploadedImage, currentUploadedImageOrigin } = useSelector(
        (state) => state.upload
    );

    const { mutate, isLoading } = useMutation<
        TImageUploadResponse,
        Error,
        FormData
    >({
        mutationFn: async (file) => await axiosMedia.post(UPLOAD_URL, file),
    });

    const { mutate: deleteImg } = useMutation<
        TDeletionResponse,
        Error,
        TDeletionRequest
    >({
        mutationFn: async (key) =>
            await axiosMedia.post(UPLOAD_DELETE_URL, key),
    });

    const handleChange = async ({ file }: UploadRequestOption) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("project", IMAGE_UPLOAD_CLIENT);

        mutate(formData, {
            onSuccess: (data) => {
                if (currentUploadedImage && currentUploadedImageOrigin) {
                    deleteImg({ key: currentUploadedImage.key });
                }

                setUrl(data.data.url);
                dispatch(setCurrentUploadedImage(data.data));
                // @ts-ignore
                dispatch(setCurrentUploadedImageOrigin(file));
                notification.success({
                    message: t("Rasm Yuklandi"),
                    icon: <Icons.checkCircle />,
                    closeIcon: null,
                });
            },
            onError: (error) => {
                notification.error({
                    message: t(error.message),
                    closeIcon: null,
                });
            },
        });
    };

    return (
        <Flex className="w-full flex-col">
            <ImgCrop modalClassName="image-editor" rotationSlider>
                <Upload
                    accept=".jpeg,.png,.webp,.avif,.jpg"
                    listType="text"
                    fileList={[]}
                    customRequest={handleChange}
                >
                    <button
                        disabled={isLoading}
                        className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gray-200"
                    >
                        {isLoading ? (
                            <span className="w-6 h-6 border-[3px] border-gray-400 rounded-full border-b-transparent animate-spin" />
                        ) : currentUploadedImage ? (
                            <LazyLoadImage
                                loading="lazy"
                                effect="blur"
                                src={currentUploadedImage.url}
                                alt={currentUploadedImage.key}
                                className="rounded-full"
                            />
                        ) : (
                            <Icons.imgUpload />
                        )}

                        <span className="flex items-center justify-center absolute bottom-0 right-0 w-5 h-5 rounded-full border-[3px] border-white text-white bg-gray-300 font-extrabold">
                            +
                        </span>
                    </button>
                </Upload>
            </ImgCrop>
            {currentUploadedImage && (
                <ImageUploadUploaded
                    uploadedImage={currentUploadedImage}
                    uploadedImageOrigin={currentUploadedImageOrigin}
                    resetUrl={resetUrl}
                />
            )}
        </Flex>
    );
}
