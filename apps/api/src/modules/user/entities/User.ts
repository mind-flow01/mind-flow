import { randomUUID } from "crypto";
import { Replace } from "src/utils/Replace";

interface UserSchema {
    email: string;
    password: string;
    name: string;
    created_at: Date;
}

export class User {
    props: UserSchema;
    _id: string;

    constructor(props: Replace<UserSchema, {created_at?: Date}>, id?: string) {
        this.props = {
            ...props,
            created_at: props.created_at || new Date(),
        }
        this._id = id || randomUUID();
    }

    get id(): string {
        return this._id
    }

    get email(): string {
        return this.props.email;
    }

    set email(email: string) {
        this.props.email = email;
    }

    get password(): string {
        return this.props.password;
    }

    set password(password: string) {
        this.props.password = password;
    }

    get name(): string {
        return this.props.name;
    }

    set name(name: string) {
        this.props.name = name;
    }

    get created_at(): Date {
        return this.props.created_at;
    }

}