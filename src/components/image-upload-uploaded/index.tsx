import { Flex, Typography, notification } from "antd";
import { IconButton, Icons } from "@/components";
import type { RcFile } from "antd/es/upload";
import type { TImageUpload } from "@/components/image-upload";
import { useDispatch, useTranslate } from "@/hooks";
import {
    setCurrentUploadedImage,
    setCurrentUploadedImageOrigin,
} from "@/redux/slices/uploadSlice";

export type ImageUploadUploadedProps = {
    url?: string;
    uploadedImage: TImageUpload | null;
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
    const dispatch = useDispatch();

    function onDelete() {
        resetUrl();
        dispatch(setCurrentUploadedImage(null));
        dispatch(setCurrentUploadedImageOrigin(null));
        notification.success({
            message: t("Rasm O'chirildi"),
            icon: <Icons.checkCircle />,
            closeIcon: null,
        });
    }

    return (
        <Flex className="w-full items-center justify-between px-2.5 py-0.5 border border-blue-500 mt-5">
            <Flex className="items-center gap-x-4">
                <Typography>
                    {uploadedImageOrigin?.name ? (
                        <Typography>{uploadedImageOrigin?.name}</Typography>
                    ) : (
                        <a href={uploadedImage?.url}>{uploadedImage?.url}</a>
                    )}
                </Typography>
            </Flex>
            <IconButton className="flex-shrink-0" onClick={onDelete}>
                <Icons.delete className="stroke-error-main" />
            </IconButton>
        </Flex>
    );
}
