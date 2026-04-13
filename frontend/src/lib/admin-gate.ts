export type AdminAccessDecision = 'allow' | 'grant' | 'deny';

interface ResolveAdminAccessInput {
  cookieValue: string | null;
  entryToken: string | null;
  configuredToken: string | undefined;
}

export function resolveAdminAccess(input: ResolveAdminAccessInput): AdminAccessDecision {
  if (input.cookieValue === '1') {
    return 'allow';
  }

  const expectedToken = input.configuredToken?.trim();
  if (!expectedToken) {
    return 'deny';
  }

  if (input.entryToken === expectedToken) {
    return 'grant';
  }

  return 'deny';
}
