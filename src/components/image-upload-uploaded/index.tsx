import { Flex, Typography, notification } from "antd";
import { IconButton, Icons } from "@/components";
import { useMutation } from "react-query";
import { axiosMedia } from "@/lib";
import { UPLOAD_DELETE_URL } from "@/utils/urls";
import type { RcFile } from "antd/es/upload";
import type { TImageUpload } from "@/components/image-upload";
import { useDispatch, useTranslate } from "@/hooks";
import {
    setCurrentUploadedImage,
    setCurrentUploadedImageOrigin,
} from "@/redux/slices/uploadSlice";

export type ImageUploadUploadedProps = {
    url?: string;
    uploadedImage: TImageUpload;
    uploadedImageOrigin: RcFile | null;
    resetUrl: () => void;
};

export type TDeletionResponse = {
    success: boolean;
};

export type TDeletionRequest = {
    key: string;
};

export function ImageUploadUploaded({
    uploadedImage,
    uploadedImageOrigin,
    resetUrl,
}: ImageUploadUploadedProps) {
    const { t } = useTranslate();
    const { key } = uploadedImage;
    const dispatch = useDispatch();
    const { mutate, isLoading } = useMutation<
        TDeletionResponse,
        Error,
        TDeletionRequest
    >({
        mutationFn: async (data) =>
            await axiosMedia.post(UPLOAD_DELETE_URL, data),
    });

    function onDelete() {
        mutate(
            { key },
            {
                onSuccess: () => {
                    resetUrl();
                    dispatch(setCurrentUploadedImage(null));
                    dispatch(setCurrentUploadedImageOrigin(null));
                    notification.success({
                        message: t("Rasm O'chirildi"),
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
            }
        );
    }

    return (
        <Flex className="w-full items-center justify-between px-2.5 py-0.5 border border-blue-500 mt-5">
            <Flex className="items-center gap-x-4">
                {isLoading && (
                    <span className="flex-shrink-0 w-5 h-5 border-[2px] border-b-transparent border-blue-500 rounded-full animate-spin" />
                )}
                <Typography>
                    {uploadedImageOrigin?.name ?? (
                        <a href={uploadedImage.url}>{uploadedImage.url}</a>
                    )}
                </Typography>
            </Flex>
            <IconButton
                className="flex-shrink-0"
                onClick={onDelete}
                disabled={isLoading}
            >
                <Icons.delete className="stroke-error-main" />
            </IconButton>
        </Flex>
    );
}
