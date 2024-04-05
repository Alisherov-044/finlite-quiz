import { ExamCard, ExamCardSkeleton } from "@/components";

export default function ExamsPage() {
    const exam = {
        starting_date: new Date("2024-04-05"),
        starting_time: "11:00",
        questions_qty: 30,
        duration: 150,
    };

    return (
        <main>
            <ExamCard exam={exam} onEdit={() => {}} onDelete={() => {}} />
            <ExamCardSkeleton />
        </main>
    );
}
