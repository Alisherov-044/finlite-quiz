import * as antd from "antd";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import { twi } from "tw-to-css";

export const FormItem = styled(antd.Form.Item)`
    &.rich-text-editor {
        ${twi`
            !h-40
        `}
    }

    .rich-text-editor-wrapper {
        ${twi`
            border-blue-500 !max-w-full !w-full rounded-none
        `}
    }

    .DraftEditor-root {
        ${twi`
            h-20
        `}
    }

    .Dropdown__value___34Py9,
    .IconButton__root___3tqZW,
    .EditorToolbar__root___3_Aqz {
        ${twi`
            !border-blue-500
        `}
    }

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
            !px-2 !py-0 !rounded-none !border !border-blue-500
        `}
    }

    .ant-input-affix-wrapper {
        ${twi`
            !pl-0 !h-12
        `}
    }

    .ant-select-selector {
        ${twi`
            !rounded-none
        `}
    }
`;

export const Col = styled(antd.Col)`
    .ant-col {
        ${twi`
            !min-h-fit
        `}
    }
`;

export const Row = tw(antd.Row)`
    !h-28
`;
