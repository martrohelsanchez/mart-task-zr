import { AbilityBuilder, Ability } from '@casl/ability';

import { ACTIONS, SUBJECTS } from '../../commons/constants/abilities';
import { UserRole } from '../../commons/constants/roles';

export function defineUserAbilities(role: UserRole) {
  const { can, rules } = new AbilityBuilder(Ability);

  switch (role) {
    case UserRole.ADMIN:
      can(ACTIONS.MANAGE, SUBJECTS.ADMIN_PAGE);
      can(ACTIONS.MANAGE, SUBJECTS.ADMIN_DONOR_PAGE);
      break;
    case UserRole.DONOR:
      can(ACTIONS.MANAGE, SUBJECTS.DONOR_PERSONAL_PAGE);
      break;
    case UserRole.RECIPIENT:
      can(ACTIONS.MANAGE, SUBJECTS.RECIPIENT_PAGE);
      break;
  }

  return new Ability(rules);
}
