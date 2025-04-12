
# babl.one :: plugins/validate

This class provides various static methods for validating different types of data such as phone numbers, emails, usernames, passwords, and more. It is designed to be used in applications where input validation is required.

## Methods

#### `phone(value: string | undefined): boolean`

Validates if the given value is a valid phone number.

- Returns `true` if valid, `false` otherwise.

#### `email(value: string | undefined): boolean`

Validates if the given value is a valid email address.

- Returns `true` if valid, `false` otherwise.

#### `username(value: string | undefined, moderateWords: string[], bannedWords: string[]): string | boolean`

Validates if the given value is a valid username.

- Checks for:
  - Minimum length of 4 characters.
  - Only alphanumeric characters and underscores.
  - The username does not contain any moderate or banned words.
- Returns a specific error code if invalid, or `true` if valid.

#### `verification(value: string | undefined): boolean`

Validates if the value is a 6-digit numeric verification code.

- Returns `true` if valid, `false` otherwise.

#### `password(value: string | undefined): boolean`

Validates if the given value is a valid password (minimum length of 6 characters).

- Returns `true` if valid, `false` otherwise.

#### `gender(value: string | undefined, genders: Record<string, string>): boolean`

Validates if the given value is a valid gender.

- Returns `true` if valid, `false` otherwise.

#### `dob(value: string | undefined): boolean`

Validates if the given value is a valid date of birth and checks if the age is 18 or older.

- Returns `true` if valid, `false` otherwise.

#### `blank(value: string | undefined): boolean`

Checks if the given value is not blank (i.e., not empty or only whitespace).

- Returns `true` if not blank, `false` otherwise.

#### `minLength(value: string | undefined, min: number): boolean`

Checks if the given value has a minimum length.

- Returns `true` if valid, `false` otherwise.

#### `inArray(value: string | undefined, haystack: string[]): boolean`

Checks if the given value exists in the provided array.

- Returns `true` if found, `false` otherwise.

#### `creditCardNumber(value: string | undefined): boolean`

Validates if the given value is a valid credit card number using the Luhn algorithm.

- Returns `true` if valid, `false` otherwise.

#### `creditCardExpiration(month: number, year: number): boolean`

Validates if the given credit card expiration month and year are valid.

- Returns `true` if valid, `false` otherwise.

#### `cvv(cardNumber: string, cvv: string): boolean`

Validates if the given CVV is valid for the provided card number.

- Returns `true` if valid, `false` otherwise.

#### `amount(value: string | undefined): boolean`

Validates if the given value is a valid currency amount (supports two decimal places).

- Returns `true` if valid, `false` otherwise.

#### `number(value: any): boolean`

Checks if the given value is a valid number.

- Returns `true` if valid, `false` otherwise.

## Usage Example

```ts
import Validate from './validate';

// Validate phone number
const isValidPhone = Validate.phone('+1 (123) 456-7890');
console.log(isValidPhone); // true

// Validate email
const isValidEmail = Validate.email('example@domain.com');
console.log(isValidEmail); // true

// Validate username
const isValidUsername = Validate.username('user_123', ['badword'], ['banned']);
console.log(isValidUsername); // true or error code

// Validate password
const isValidPassword = Validate.password('securepassword123');
console.log(isValidPassword); // true
```

## License

MIT License.
