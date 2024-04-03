import { Badge, Dropdown } from "antd";
import { IconButton, Icons } from "@/components";

export function Notifications() {
    const items = [
        {
            key: "1",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.antgroup.com"
                >
                    1st menu item
                </a>
            ),
        },
    ];

    return (
        <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
            <IconButton>
                <Badge count={1}>
                    <Icons.bell />
                </Badge>
            </IconButton>
        </Dropdown>
    );
}
