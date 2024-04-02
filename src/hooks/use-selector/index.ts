import { useSelector as useReduxSelector } from "react-redux";
import type { RootState } from "@/redux/types";

export function useSelector<T>(callbackFn: (state: RootState) => T) {
    return useReduxSelector(callbackFn);
}
