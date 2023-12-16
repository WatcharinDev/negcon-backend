import { ApiProperty } from "@nestjs/swagger"

export class response_message{
    code:number
    message:string
}
export class response_data{
    @ApiProperty()
    code:number
    @ApiProperty()
    data:any
    @ApiProperty()
    count:number
    @ApiProperty()
    message:string
}
export class access_token{
    @ApiProperty()
    code: string
    @ApiProperty()
    username: string 
    @ApiProperty()
    first_name: string
    @ApiProperty() 
    last_name: string
    @ApiProperty() 
    role_id: number
    @ApiProperty()
    role_code:string

}