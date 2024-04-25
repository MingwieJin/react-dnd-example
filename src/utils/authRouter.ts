import { UserRole, roleAuthPage } from '@/constants/common';

export default function authRouter(role: string, currPath: string) {
  let isAuthRouter = false;
  if (currPath.startsWith(roleAuthPage[role])) isAuthRouter = true;
  return {
    isAuthRouter,
  };
}
