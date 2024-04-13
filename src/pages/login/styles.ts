import * as antd from "antd";
import { twi } from "tw-to-css";
import styled from "styled-components";

export const Checkbox = styled(antd.Checkbox)`
    .ant-checkbox-inner {
        ${twi`
            !w-5 !h-5 !rounded-md bg-transparent 
        `}
    }

    .ant-checkbox-checked .ant-checkbox-inner {
        ${twi`
            !bg-blue-100 !border-blue-100
        `}
    }

    .ant-checkbox-checked .ant-checkbox-inner::after {
        ${twi`
            !border-black !ml-0.5 !border-[2px]
        `};
    }
`;

export const FormItem = styled(antd.Form.Item)`
    ${twi`
        sm:!pt-6 !w-[300px] !flex-none
    `}

    .ant-form-item {
        ${twi`
            !w-full !flex-none
        `}

        &-row {
            ${twi`
                flex flex-col items-start
            `}
        }

        &-control {
            ${twi`
                w-full !flex-none
            `}

            .ant-input,
            .ant-input-affix-wrapper {
                ${twi`
                    !bg-blue-100 !border-none !h-10 !py-0 !rounded-xl
                `}
            }
        }

        &-label {
            ${twi`
                text-lg font-bold capitalize
            `}
        }
    }
`;

export const FormCheckbox = styled(antd.Form.Item)`
    ${twi`
        sm:!pt-8 !mb-0
    `}

    .ant-form-item {
        &-row {
            ${twi`
                flex flex-row-reverse !flex-nowrap items-center justify-end gap-x-3
            `}
        }

        &-control {
            ${twi`
                !flex-none
            `}
        }

        &-label {
            ${twi`
                first-letter:capitalize font-normal
            `}
        }
    }
`;
