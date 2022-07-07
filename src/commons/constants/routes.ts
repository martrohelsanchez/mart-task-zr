const publicRoutes = {
  ADMIN_SIGN_IN: '/admin/sign-in',
  REGISTER: '/register',
  ROOT: '/',
  PUBLIC_GALLERY: '/gallery/:pageId',
  VERIFY_ALTERNATE_EMAIL: '/alternate-email/verify/:token',
};

const donorPersonalRoutes = {
  DASHBOARD: '/dashboard',
  DONOR_GALLERY: '/gallery',
  DONOR_PERSONAL_DASHBOARD_VIEW: '/dashboard/:view',
  DONOR_SIGN_IN: '/users/sign-in',
  EDIT_PROFILE: '/edit-profile',
  EDIT_PROFILE_TAB: '/edit-profile/:tab',
  PERSONAL_GALLERY: '/pages/:pageId',
  DONOR_TAX: '/tax-deductions',
};

const adminRoutes = {
  ADD_ADMIN: '/admin/admins/new',
  ADMINS: '/admin/admins',
  ADMIN_ADD_GIVE: '/admin/gives/add',
  ADMIN_ADD_PLATFORMS: '/admin/platforms/add',
  ADMIN_ADD_RECIPIENT: '/admin/recipients/add',
  ADMIN_ADD_RECIPIENTS: '/admin/recipients/add',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_DONORS: '/admin/donors',
  ADMIN_EDIT_DONOR: '/admin/donors/:donorId/edit',
  ADMIN_EDIT_GIVE: '/admin/gives/:giveId/edit',
  ADMIN_EDIT_PLATFORMS: '/admin/platforms/:platformId/edit',
  ADMIN_EDIT_RECIPIENT: '/admin/recipients/:recipientId/edit',
  ADMIN_GIVES: '/admin/gives',
  ADMIN_PLATFORMS: '/admin/platforms',
  ADMIN_RECIPIENTS: '/admin/recipients',
  ADMIN_RECIPIENTS_DETAILS: '/admin/recipients/:recipientId',
  ADMIN_RECIPIENTS_EDIT: '/admin/recipients/:recipientId/edit',
  ADMIN_VIEW_GIVE: '/admin/gives/view/:giveId',
  ADMIN_VIEW_RECIPIENT: '/admin/recipients/:recipientId',
  EDIT_ADMIN: '/admin/admins/:adminId/edit',
};

const adminDonorRoutes = {
  ADMIN_DONOR_DASHBOARD: '/admin/users/:donorId/dashboard',
  ADMIN_DONOR_DASHBOARD_VIEW: '/admin/users/:donorId/dashboard/:view',
  ADMIN_DONOR_GALLERY: '/admin/users/:donorId/gallery/:pageId',
  ADMIN_DONOR_GALLERY_LANDING: '/admin/users/:donorId/gallery',
  ADMIN_DONOR_ROOT: '/admin/users/:donorId',
  ADMIN_DONOR_TAX: '/admin/users/:donorId/tax',
};

const recipientPersonalRoutes = {
  RECIPIENT_SIGN_IN: '/recipient/sign-in',
  RECIPIENT_HOMEPAGE: '/',
};

export default {
  ...adminDonorRoutes,
  ...adminRoutes,
  ...donorPersonalRoutes,
  ...publicRoutes,
  ...recipientPersonalRoutes,
};
