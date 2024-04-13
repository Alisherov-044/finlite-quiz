import { z } from "zod";
import InputMask from "react-input-mask";
import { Icons, Logo } from "@/components";
import { useDispatch, useSelector, useTranslate } from "@/hooks";
import { Button, Flex, Form, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox, FormCheckbox, FormItem } from "./styles";
import { useMutation } from "react-query";
import { axiosPublic } from "@/lib";
import { LOGIN_URL } from "@/utils/urls";
import { setAuth } from "@/redux/slices/authSlice";
import { parsePhoneNumber } from "@/utils";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const LoginFormScheme = z.object({
    phone_number: z.string().min(19),
    password: z.string(),
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
        defaultValues: {
            phone_number: "+(998)",
        },
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
        if (
            parsePhoneNumber(values.phone_number) === "+998999999999" &&
            values.password === "admin"
        ) {
            roles.push(1312);
        } else if (
            parsePhoneNumber(values.phone_number) === "+998999999999" &&
            values.password === "teacher"
        ) {
            roles.push(1028);
        } else if (
            parsePhoneNumber(values.phone_number) === "+998999999999" &&
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
        <Flex className="overflow-hidden w-full h-full items-center justify-center bg-bg-gray">
            <Flex className="flex-col px-4 py-6 sm:px-9 sm:py-12 bg-white rounded-[32px] z-10 shadow-login">
                <Logo className="mb-4 self-center" />
                <Form onFinish={handleSubmit(onSubmit)}>
                    <FormItem label={t("Telefon Raqam")}>
                        <Controller
                            name="phone_number"
                            control={control}
                            render={({ field }) => (
                                <InputMask
                                    className="ant-input"
                                    type="tel"
                                    mask="+(999) 99 999-99-99"
                                    maskChar={null}
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem label={t("Parol")}>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input.Password
                                    iconRender={(visible) =>
                                        visible ? (
                                            <Icons.eye.open />
                                        ) : (
                                            <Icons.eye.close />
                                        )
                                    }
                                    {...field}
                                />
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
