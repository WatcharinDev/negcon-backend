import { ApiProperty } from "@nestjs/swagger"

export class role_form_action {
    @ApiProperty()
    id:number
    @ApiProperty()
    code: string
    @ApiProperty()
    name: string
}
