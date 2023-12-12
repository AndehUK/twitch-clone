interface Verification {
  attempts: number;
  status: string;
  strategy: string;
}

interface EmailAddress {
  email_address: string;
  id: string;
  linked_to: string[];
  object: string;
  verification: Verification;
}

interface PhoneNumber {
  default_second_factor: boolean;
  id: string;
  linked_to: string[];
  object: string;
  phone_number: string;
  reserved_for_second_factor: boolean;
  verification: Verification;
}

interface Web3Wallet {
  id: string;
  object: string;
  verification: Verification;
  web3_wallet: string;
}

interface UserCreatedWebhookEventData {
  birthday: string;
  created_at: number;
  email_addresses: EmailAddress[];
  external_accounts: string[];
  external_id: string;
  first_name: string;
  gender: string;
  id: string;
  image_url: string;
  last_name: string;
  last_sign_in_at: number;
  object: string;
  password_enabled: boolean;
  phone_numbers: PhoneNumber[];
  primary_email_address_id: string;
  primary_phone_number_id: string;
  primary_web3_wallet_id: string;
  private_metadata: object;
  profile_image_url: string;
  public_metadata: object;
  two_factor_enabled: boolean;
  unsafe_metadata: object;
  updated_at: number;
  username: string;
  web3_wallets: Web3Wallet[];
}

export interface UserWebhookEvent {
  data: UserCreatedWebhookEventData;
  object: string;
  type: string;
}

interface UserDeletedWebhookEventData {
  deleted: boolean;
  id: string;
  object: string;
}

export interface UserDeletedWebhookEvent {
  data: UserDeletedWebhookEventData;
  object: string;
  type: string;
}
