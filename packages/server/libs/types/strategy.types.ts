export type IProfile = {
    provider: string;
    sub: string;
    id: string;
    displayName: string;
    name: { givenName: string; familyName: string };
    email_verified: true;
    verified: true;
    email: string;
    photos: Array<{
      value: string;
    }>;
  };