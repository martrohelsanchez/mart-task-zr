import bcrypt from 'bcryptjs';

const HASH_ROUNDS = 11;

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(HASH_ROUNDS);

  return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
