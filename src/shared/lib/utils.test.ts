import { describe, expect, it } from 'vitest';

import { cn } from '@/shared/lib/utils';

describe('cn utility function', () => {
  it('클래스 이름들을 하나로 합쳐야 한다', () => {
    expect(cn('btn', 'btn-primary')).toBe('btn btn-primary');
  });

  it('조건부 클래스를 올바르게 처리해야 한다', () => {
    expect(cn('btn', true && 'active', false && 'hidden')).toBe('btn active');
  });

  it('Tailwind 클래스 충돌을 해결해야 한다 (twMerge 작동 확인)', () => {
    // p-4와 p-8이 같이 있으면 나중에 온 p-8만 남아야 함
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });
});
