import { Flex } from "antd";
import { Icons, Logo, IconButton } from "@/components";

export type QuizHeaderProps = {
    onExit: () => void;
};

export function QuizHeader({ onExit }: QuizHeaderProps) {
    return (
        <Flex className="w-full items-center justify-between py-9">
            <Logo />
            <IconButton onClick={onExit}>
                <Icons.logout />
            </IconButton>
        </Flex>
    );
}
