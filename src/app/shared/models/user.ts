export class User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isCurrentUserLoggedIn = false;
    initials: string;
    accountId: string;
    name: string;
    picture?: string;
    roles?: number[];
}
