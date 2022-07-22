export enum StatusEnum {
    CREATE = 'CREATE';
    CREATED = 'CREATED';
    ACTIVE = "ACTIVE";
    DESTROY = "DESTROY";
}

export type StatusType = keyof typeof StatusEnum
