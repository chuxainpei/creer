import { resolveAdminAccess } from '@/src/lib/admin-gate';

describe('resolveAdminAccess', () => {
  test('allows when access cookie is present', () => {
    expect(
      resolveAdminAccess({
        cookieValue: '1',
        entryToken: null,
        configuredToken: 'entry-secret',
      }),
    ).toBe('allow');
  });

  test('grants access when entry token is correct', () => {
    expect(
      resolveAdminAccess({
        cookieValue: null,
        entryToken: 'entry-secret',
        configuredToken: 'entry-secret',
      }),
    ).toBe('grant');
  });

  test('denies access when no valid gate signal is present', () => {
    expect(
      resolveAdminAccess({
        cookieValue: null,
        entryToken: null,
        configuredToken: 'entry-secret',
      }),
    ).toBe('deny');
  });
});
