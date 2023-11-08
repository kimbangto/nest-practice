export class UserDto {
  userEmail: string;
  userPassword?: string;
  userNickname: string;
  profileUrl: string | null;
  provider: string;
}
