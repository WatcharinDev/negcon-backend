import { ApiProperty } from "@nestjs/swagger";
import { users } from "src/entities/users.entity";

export class user_sign_up {
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
    @ApiProperty()
    first_name: string;
    @ApiProperty()
    last_name: string;
    @ApiProperty()
    tel:string;
    @ApiProperty()
    birthday:string;
    @ApiProperty()
    role_id:number
    @ApiProperty()
    role_code:string
    @ApiProperty()
    Introduction:string
}
export class user_sign_in{
    @ApiProperty()
    username:string
    @ApiProperty()
    password:string
}
export class user_session{
    @ApiProperty()
    id:number
    @ApiProperty()
    code:string
    @ApiProperty()
    username:string
    @ApiProperty()
    first_name:string
    @ApiProperty()
    last_name:string
    @ApiProperty()
    role_id:number
    @ApiProperty()
    role_code:string
    @ApiProperty()
    access_token:string
}
export interface user_data{
    id: number;
    code: string;
    username: string;
    first_name: string;
    last_name: string;
    role_id: number;
    role_code: string;
    tel: string;
    created_by: string;
    created_at: Date;
}