import { z } from "zod";
import InputMask from "react-input-mask";
import { Icons, Logo } from "@/components";
import { useDispatch, useSelector, useTranslate } from "@/hooks";
import { Button, Flex, Form, Input, Typography, notification } from "antd";
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
    phone_number: z
        .string({ required_error: "telefon raqamingizni kiriting" })
        .min(19, "telefon raqamingizni to'liq kiriting"),
    password: z.string({ required_error: "parolni kiriting" }),
    remember: z.boolean().optional().default(false),
});

export type TResponse = {
    data: {
        access_token: string;
        first_name: string;
        id: number;
        last_name: string;
        phone_number: string;
        refresh_token: string;
        role: number;
    };
};

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
        formState: { isLoading, isDirty, errors },
    } = useForm<z.infer<typeof LoginFormScheme>>({
        resolver: zodResolver(LoginFormScheme),
        defaultValues: {
            phone_number: "+(998)",
        },
    });
    const { mutate } = useMutation<
        TResponse,
        Error,
        z.infer<typeof LoginFormScheme>
    >({
        mutationFn: async (userData) =>
            await axiosPublic.post(LOGIN_URL, userData).then((res) => res.data),
    });

    const dispatch = useDispatch();

    const onSubmit = (values: z.infer<typeof LoginFormScheme>) => {
        mutate(
            { ...values, phone_number: parsePhoneNumber(values.phone_number) },
            {
                onSuccess: (data) => {
                    dispatch(
                        setAuth({
                            id: data.data.id,
                            isAuthenticated: true,
                            roles: [data.data.role],
                            name: `${data.data.first_name} ${data.data.last_name}`,
                            phone_number: data.data.phone_number,
                            access_token: data.data.access_token,
                            refresh_token: data.data.refresh_token,
                        })
                    );
                    navigate("/");
                },
                onError: (error) => {
                    notification.error({
                        message: t(error.message),
                        closeIcon: null,
                    });
                },
            }
        );
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
                        {errors.phone_number && (
                            <Typography className="mt-2 !text-error-main">
                                {errors.phone_number.message}
                            </Typography>
                        )}
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
                        {errors.password && (
                            <Typography className="mt-2 !text-error-main">
                                {errors.password.message}
                            </Typography>
                        )}
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
