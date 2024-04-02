import { useEffect, useState } from "react";
import { Select } from "antd";
import { languages } from "./data";
import { useDispatch, useSelector } from "@/hooks";
import { setLang } from "@/redux/slices/langSlice";

export function SelectLanguage() {
    const localLang = localStorage.getItem("lang");
    const { currentLang } = useSelector((state) => state.lang);
    const [defaultLang, setDefaultLang] = useState<string>(
        localLang ? JSON.parse(localLang) : currentLang
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (localLang !== null) {
            setDefaultLang(JSON.parse(localLang));
            dispatch(setLang(JSON.parse(localLang)));
        }
    }, []);

    return (
        <Select
            dropdownAlign={{ points: ["br"] }}
            suffixIcon={null}
            prefixCls="lang-select"
            defaultValue={defaultLang}
            options={languages}
            onChange={(value) => dispatch(setLang(value))}
        />
    );
}
