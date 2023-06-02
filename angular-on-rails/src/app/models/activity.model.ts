export interface Activity {
    id: number;
    action: string;
    description: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    url: string;
}