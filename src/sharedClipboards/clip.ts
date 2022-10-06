export interface Clip {
  id: number;
  userId: number;
  clipName: string;
  encryptedContent: string;
  modifiedAt: string;
  createdAt: string;
}

export interface ClipCreationResponse {
  id: number;
}
