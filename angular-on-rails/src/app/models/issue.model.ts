import { Document } from "./document.model";

export enum State {
    New = 'new',
    InProgress = 'in_progress',
    ReadyForTest = 'ready_for_test',
    Closed = 'closed',
    NeedsInfo = 'needs_info',
    Rejected = 'rejected',
    Postponed = 'postponed',
}

export enum TypeOf {
    Bug = 'bug',
    Enhancement = 'enhancement',
    Question = 'question',
}

export enum Severity {
    Wishlist = 'wishlist',
    Minor = 'minor',
    Normal = 'normal',
    Important = 'important',
    Critical = 'critical',
}

export enum Priority {
    Low = 'low',
    Normal = 'normal',
    High = 'high',
}

export interface Issue {
    id: number;
    subject: string;
    description: string;
    created_by_id: number;
    assigned_to_id: number | null;
    state: State
    typeof: TypeOf;
    severity: Severity;
    priority: Priority;
    deadline: Date | null;
    created_at: Date;
    updated_at: Date;
    url: string;
    bloqueada: boolean;
    documents: Document[] | null;
    watched_by_ids: number[] | null;
    apiKey: string;
}
