import * as antd from "antd";
import styled from "styled-components";
import { twi } from "tw-to-css";

export const Drawer = styled(antd.Drawer)`
    .ant-drawer {
        &-header {
            ${twi`
                border-none mt-10 px-5 py-0
            `}
        }

        &-title {
            ${twi`
                uppercase text-blue-900
            `}
        }

        &-body {
            ${twi`
                flex mt-10 px-5 py-0 pb-3
            `}
        }
    }
`;
