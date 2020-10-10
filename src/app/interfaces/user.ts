export interface User {
  uid: string;
  name: string;
  avatarURL: string;
  email: string;
  ownerEventIds: string[];
  attendEventIds: string[];
  absentEventIds: string[];
  considerEventIds: string[];
}
