import { setAuth } from "@/redux/slices/authSlice";
import { useDispatch, useOpen, useTranslate } from "@/hooks";
import { Confirmation, IconButton, Icons } from "@/components";
import { useLocation, useNavigate } from "react-router-dom";
import { setPreviousLocation } from "@/redux/slices/routeSlice";

export type LogoutProps = {
    className?: string;
};

export function Logout({ className }: LogoutProps) {
    const { t } = useTranslate();
    const { isOpen, open, close } = useOpen();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onConfirm = () => {
        dispatch(
            setAuth({
                access_token: "",
                id: -1,
                isAuthenticated: false,
                refresh_token: "",
                roles: [],
            })
        );
        dispatch(setPreviousLocation("/login"));
        return navigate("/login", { state: { from: location }, replace: true });
    };

    return (
        <>
            <IconButton onClick={open} className={className}>
                <Icons.logout />
            </IconButton>

            <Confirmation
                isOpen={isOpen}
                onCancel={close}
                onConfirm={onConfirm}
                btnText={t("Chiqish")}
                title={t("Chiqish")}
                description={t("Tizimdan chiqishni istaysizmi?")}
            />
        </>
    );
}
