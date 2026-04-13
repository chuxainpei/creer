describe('demo mode api fallback', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    jest.resetModules();
    process.env.NEXT_PUBLIC_DEMO_MODE = '0';
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://127.0.0.1:8000';
    global.fetch = originalFetch;
  });

  test('askQuestion falls back to local mock data when api fails in demo mode', async () => {
    process.env.NEXT_PUBLIC_DEMO_MODE = '1';
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://demo-api.example.com';
    global.fetch = jest.fn().mockRejectedValue(new Error('network down')) as typeof fetch;

    const { askQuestion } = await import('@/src/lib/api');
    const result = await askQuestion('双选会报名流程是什么？');

    expect(result.answer).toContain('双选会');
    expect(result.source_tags.length).toBeGreaterThan(0);
    expect(result.evidence.length).toBeGreaterThan(0);
    expect(result.used_official).toBe(true);
  });

  test('streamQuestion emits synthesized answer metadata when api fails in demo mode', async () => {
    process.env.NEXT_PUBLIC_DEMO_MODE = '1';
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://demo-api.example.com';
    global.fetch = jest.fn().mockRejectedValue(new Error('network down')) as typeof fetch;

    const { streamQuestion } = await import('@/src/lib/api');
    const onDelta = jest.fn();
    const onMetadata = jest.fn();

    await streamQuestion('档案去向怎么确认？', {
      onDelta,
      onMetadata,
    });

    expect(onDelta).toHaveBeenCalled();
    expect(onMetadata).toHaveBeenCalledWith(
      expect.objectContaining({
        used_official: true,
      }),
    );
  });
});
