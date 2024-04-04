import { Icons, UserCard } from "@/components";
import { Input } from "antd";

export default function TeachersPage() {
    const user = {
        image: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        full_name: "Bekchanov Javlonbek",
        group: 2,
        email: "javlonbek",
        role: "teacher",
    };

    return (
        <main>
            <Input
                prefix={<Icons.search />}
                placeholder="Search..."
                prefixCls="search-input"
            />
            <UserCard user={user} onEdit={() => {}} onDelete={() => {}} />
        </main>
    );
}
