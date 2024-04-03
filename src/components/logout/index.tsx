import { setAuth } from "@/redux/slices/authSlice";
import { useDispatch, useOpen, useTranslate } from "@/hooks";
import { Confirmation, IconButton, Icons } from "@/components";
import { useLocation, useNavigate } from "react-router-dom";

export function Logout() {
    const { t } = useTranslate();
    const { isOpen, open, close } = useOpen();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onConfirm = () => {
        dispatch(
            setAuth({ name: undefined, roles: [], isAuthenticated: false })
        );
        return navigate("/login", { state: { from: location }, replace: true });
    };

    return (
        <>
            <IconButton onClick={open}>
                <Icons.logout />
            </IconButton>

            <Confirmation
                isOpen={isOpen}
                onCancel={close}
                onConfirm={onConfirm}
                btnText={t("logout")}
                title={t("logout")}
                description={t("do you wanna logout")}
            />
        </>
    );
}
