import { Input } from "antd";
import {
    Icons,
    UserCard,
    UserCardSkeleton,
    UserResultsCard,
    UserResultsCardSkeleton,
} from "@/components";

export default function StudentsPage() {
    const user = {
        image: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        full_name: "Bekchanov Javlonbek",
        group: 2,
        email: "javlonbek",
        role: "student",
    };

    const result = {
        correct_answers: 16,
        incorrect_answers: 14,
        duration: 134,
    };

    return (
        <main>
            <Input
                prefix={<Icons.search />}
                placeholder="Search..."
                prefixCls="search-input"
            />
            <UserCard user={user} onEdit={() => {}} onDelete={() => {}} />
            <UserCardSkeleton role="student" />
            <UserResultsCard user={user} result={result} />
            <UserResultsCardSkeleton />
        </main>
    );
}
