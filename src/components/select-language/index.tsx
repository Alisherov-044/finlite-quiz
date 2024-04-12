import { Select } from "antd";
import { languages } from "./data";
import { useDispatch, useSelector } from "@/hooks";
import { setLang } from "@/redux/slices/langSlice";

export type SelectLanguageProps = {
    className?: string;
};

export function SelectLanguage({ className }: SelectLanguageProps) {
    const { currentLang } = useSelector((state) => state.lang);
    const dispatch = useDispatch();

    return (
        <Select
            className={className}
            dropdownAlign={{ points: ["br"] }}
            suffixIcon={null}
            prefixCls="lang-select"
            defaultValue={currentLang}
            options={languages}
            onChange={(value) => dispatch(setLang(value))}
        />
    );
}
