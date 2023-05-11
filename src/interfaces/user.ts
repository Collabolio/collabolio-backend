export interface CreateRequest {
  email: string;
  password: string;
  emailVerified?: boolean;
  displayName: string;
  disabled?: boolean;
  photoURL?: string;
  createdAt?: Date;
  updateAt?: Date;
}
