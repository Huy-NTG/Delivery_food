// src/user/dto/create-user.dto.ts
export class CreateUserDto {
     email: string;
     username: string;
     password: string;
     sdt?: string;
     role?: string;
     status?: string; 
     lastLogin?: Date;
}
