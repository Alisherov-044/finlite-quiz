import { SelectPracticeMode } from "@/components";
import { useOpen } from "@/hooks";
import { Button } from "antd";

export default function PracticePage() {
    const { isOpen, open, close } = useOpen();

    return (
        <main>
            <Button onClick={open}>open</Button>
            <SelectPracticeMode
                isOpen={isOpen}
                onSubmit={(values) => console.log(values)}
                onCancel={close}
            />
        </main>
    );
}
