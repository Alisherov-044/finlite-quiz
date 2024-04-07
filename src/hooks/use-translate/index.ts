import { useEffect } from "react";
import { useSelector } from "@/hooks";
import { useTranslation } from "react-i18next";
// import { TTtranslation, resources } from "@/i18n";
import { latinToCyrillic } from "@/utils";

export function useTranslate(defaultLng?: string) {
    const browserLng = navigator.language;
    const { i18n } = useTranslation();
    const { currentLang: selectedLang } = useSelector((state) => state.lang);
    const currentLng = defaultLng ?? selectedLang ?? browserLng;

    useEffect(() => {
        i18n.changeLanguage(currentLng);
    }, [selectedLang]);

    // const t = (key: TTtranslation, option?: string | number) => {
    //     if (typeof option !== "undefined") {
    //         try {
    //             // @ts-ignore
    //             return resources[currentLng].translation[key](option);
    //         } catch (error) {
    //             return translate(key);
    //         }
    //     }

    //     return translate(key);
    // };

    const t = (text: string) => {
        if (currentLng === "ru") {
            return latinToCyrillic(text);
        }

        return text;
    };

    return { t, i18n, browserLng, currentLng };
}
