import * as antd from "antd";
import styled from "styled-components";
import { twi } from "tw-to-css";

export const FormItem = styled(antd.Form.Item)`
    ${twi`
        !min-h-20 !mb-14
    `}

    .ant-form-item {
        &-row {
            ${twi`
                flex flex-col gap-y-1.5
            `}
        }

        &-label {
            ${twi`
                text-start
            `}
        }

        &-label label {
            ${twi`
                !text-blue-900 font-medium uppercase
            `}
        }

        &-control-input,
        &-control-input-content,
        &-control-input input {
            ${twi`
                !h-12
            `}
        }
    }

    .ant-input,
    .ant-input-affix-wrapper {
        ${twi`
            !px-2 !py-0 !rounded-none !border-blue-300
        `}
    }

    .ant-input-affix-wrapper {
        ${twi`
            !pl-0 !h-12
        `}
    }

    .ant-select-selector {
        ${twi`
            !rounded-none !py-0
        `}
    }
`;
