import {
    PracticeCard,
    PracticeCardSkeleton,
    SelectPracticeMode,
} from "@/components";
import { useOpen } from "@/hooks";
import { Button } from "antd";

export default function PracticePage() {
    const { isOpen, open, close } = useOpen();

    const practice = {
        date: new Date("2024-04-05"),
        department: "1C Dasturi prinsiplari",
        test_qty: 10,
        correct_answers: 8,
    };

    return (
        <main>
            <Button onClick={open}>open</Button>
            <SelectPracticeMode
                isOpen={isOpen}
                onSubmit={(values) => console.log(values)}
                onCancel={close}
            />

            <PracticeCard practice={practice} />
            <PracticeCardSkeleton />
        </main>
    );
}
