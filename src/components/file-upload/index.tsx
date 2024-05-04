import { Icons, ImageUploadUploaded } from "@/components";
import { Flex, Typography, Upload, type UploadProps } from "antd";
import { useDispatch, useSelector, useTranslate } from "@/hooks";
import { setCurrentUploadedImageOrigin } from "@/redux/slices/uploadSlice";
import type { UploadRequestOption } from "rc-upload/lib/interface";

export type FileUploadProps = UploadProps & {
    setUrl: (url: any) => void;
    resetUrl: () => void;
};

export function FileUpload({ setUrl, resetUrl }: FileUploadProps) {
    const { t } = useTranslate();
    const dispatch = useDispatch();
    const { currentUploadedImage, currentUploadedImageOrigin } = useSelector(
        (state) => state.upload
    );

    const handleChange = async ({ file }: UploadRequestOption) => {
        // @ts-ignore
        dispatch(setCurrentUploadedImageOrigin(file));
        setUrl(file);
    };

    return (
        <Flex className="w-full flex-col">
            <Flex className="flex-col items-center justify-center gap-y-1.5 p-8 border border-dashed border-blue-500">
                <Icons.upload />
                <Flex className="items-center gap-x-1">
                    <Typography className="font-bold">
                        {t("Savol uchun fayl")}
                    </Typography>
                    <Upload
                        accept=".xlsx,xls"
                        listType="text"
                        fileList={[]}
                        customRequest={handleChange}
                    >
                        <Typography className="cursor-pointer font-semibold !text-blue-700 underline">
                            {t("Yuklash")}
                        </Typography>
                    </Upload>
                </Flex>
                <Typography>{t("Fayl yuklash formati: XLSX")}</Typography>
            </Flex>
            {currentUploadedImageOrigin && (
                <ImageUploadUploaded
                    uploadedImage={currentUploadedImage}
                    uploadedImageOrigin={currentUploadedImageOrigin}
                    resetUrl={resetUrl}
                />
            )}
        </Flex>
    );
}
