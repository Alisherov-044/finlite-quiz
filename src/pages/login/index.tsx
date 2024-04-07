import { z } from "zod";
import { Logo } from "@/components";
import { useDispatch, useSelector, useTranslate } from "@/hooks";
import { Button, Flex, Form, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox, FormCheckbox, FormItem } from "./styles";
import { useMutation } from "react-query";
import { axiosPublic } from "@/lib";
import { LOGIN_URL } from "@/utils/urls";
import { setAuth } from "@/redux/slices/authSlice";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const LoginFormScheme = z.object({
    email: z.string({ required_error: "this field is required" }),
    password: z.string({ required_error: "this filed is required" }),
    remember: z.boolean().optional().default(false),
});

export default function LoginPage() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();

    if (isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    const { t } = useTranslate();
    const {
        control,
        handleSubmit,
        reset,
        formState: { isLoading, isDirty },
    } = useForm<z.infer<typeof LoginFormScheme>>({
        resolver: zodResolver(LoginFormScheme),
    });
    const { mutate } = useMutation({
        mutationFn: (userData: z.infer<typeof LoginFormScheme>) =>
            axiosPublic.post(LOGIN_URL, userData),
    });

    // fake login call
    const dispatch = useDispatch();

    const onSubmit = (values: z.infer<typeof LoginFormScheme>) => {
        console.log(values);

        let roles = [];
        if (values.email === "admin" && values.password === "admin") {
            roles.push(1312);
        } else if (
            values.email === "teacher" &&
            values.password === "teacher"
        ) {
            roles.push(1028);
        } else if (
            values.email === "student" &&
            values.password === "student"
        ) {
            roles.push(3216);
        }

        if (roles.length !== 0) {
            dispatch(
                setAuth({ isAuthenticated: true, roles, name: "Sa'dulla" })
            );
            return navigate("/");
        }
        mutate(values);
        reset();
    };

    return (
        <Flex className="w-full h-full items-center justify-center bg-bg-gray">
            <Flex className="flex-col px-9 py-12 bg-white rounded-[32px] z-10 shadow-login">
                <Logo className="mb-4 self-center" />
                <Form onFinish={handleSubmit(onSubmit)}>
                    <FormItem label={t("Login")}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                        />
                    </FormItem>
                    <FormItem label={t("Parol")}>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input.Password {...field} />
                            )}
                        />
                    </FormItem>
                    <FormCheckbox label={t("Meni eslab qolish")}>
                        <Controller
                            name="remember"
                            control={control}
                            render={({ field }) => (
                                <Checkbox {...field} checked={field.value} />
                            )}
                        />
                    </FormCheckbox>
                    <Button
                        htmlType="submit"
                        loading={isLoading}
                        disabled={!isDirty || isLoading}
                        className="mt-8 !py-[10px] !w-full !rounded-xl !capitalize"
                    >
                        {t("Kirish")}
                    </Button>
                </Form>
            </Flex>
        </Flex>
    );
}
