import { Field, Float, InputType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, IsEnum, IsIn, IsNotEmpty, IsNumber, IsPositive, IsString, Matches, MinLength } from "class-validator";
import { DocumentType } from "../enums/user-document-type.enum";


// @InputType({
//     description: 'Inputs user register'
// })
export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @Field(()=> String,{description:'User name'})  
  name: string;
  
  @IsString()
  @IsNotEmpty()
  @Field(()=> String,{description:'User Last_name'})  
  last_name: string;
  
  @IsString()
  @Field(()=> String,{description:'User Zip'})  
  zip: string;
  
  @IsString()
  @IsEnum(DocumentType)
  @Field(()=> DocumentType,{description:'User document type'})  
  document_type: DocumentType;
  
  @IsNumber()
  @IsPositive()
  @Field(()=> Float, {description: 'User document number'})
  document_num: number;
  
  @IsNumber()
  @IsPositive()
  @Field(()=> Float, {description: 'User Phone'})
  phone: number;
  
  @IsString()
  @Field(()=> String,{description:'User RFC'})  
  rfc: string;
  
  @IsEmail()
  @Field(()=> String,{description:'User Email'})  
  email: string;
  
  @IsString()
  @MinLength(6)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @Field(()=> String,{description:'User password that must have a minimum length of 6 digits and the password must have an Uppercase, lowercase letter and a number'})  
  password: string;
  
  @IsBoolean()
  @IsIn([true, false])
  @Field(()=>Boolean, {description: 'User Status'})
  isActive: boolean;
  
  @IsString({each:true})
  @Field(()=> [String],{description:'User roles wich can [ admin, user] by default takes the user role'})  
  roles: string[];
}
