export interface User {
    id: number;
    name: string;
    bio: string;
    email: string;
    watched_issue_ids: number[];
    created_at: Date;
    updated_at: Date;
    avatar: string;
    url: string;
}

