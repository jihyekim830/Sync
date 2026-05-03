import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },
    // import 문 정렬 규칙
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. 외부 라이브러리
            ['^\\w', '^@(?!(/))'],
            // 2. 절대 경로 (@/*)
            ['^@/'],
            // 3. 상대 경로 (../, ./)
            [
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\./(?=.*/)(?!/?$)',
              '^\\./?$',
              '^\\.\\./?$',
              '^\\./?$',
            ],
            // 4. 스타일 및 기타 (CSS, Polyfill 등)
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/first': 'error', // 모든 import 문은 파일 최상단에
      'import/newline-after-import': 'error', // import 문 뒤에는 한 줄 띄우기
      'import/no-duplicates': 'error', // 중복 import 방지
    },
  },
  eslintConfigPrettier,
]);

export default eslintConfig;
