import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import boundaries from 'eslint-plugin-boundaries';
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
      boundaries,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        {
          type: 'widgets',
          pattern: 'src/widgets/**',
          mode: 'folder',
          capture: ['sliceName'],
        },
        {
          type: 'features',
          pattern: 'src/features/**',
          mode: 'folder',
          capture: ['sliceName'],
        },
        {
          type: 'entities',
          pattern: 'src/entities/**',
          mode: 'folder',
          capture: ['sliceName'],
        },
        { type: 'shared', pattern: 'src/shared/**' },
      ],
      'boundaries/ignore': ['**/*.test.*', '**/*.spec.*'],
    },
    rules: {
      // import 문 정렬 규칙
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

      // import 문 규칙
      'import/first': 'error', // 모든 import 문은 파일 최상단에
      'import/newline-after-import': 'error', // import 문 뒤에는 한 줄 띄우기
      'import/no-duplicates': 'error', // 중복 import 방지

      // FSD 레이어 간 참조 규칙
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          message: '${file.type} 레이어는 ${dependency.type} 레이어를 참조할 수 없습니다.',
          rules: [
            {
              from: 'app',
              allow: ['widgets', 'features', 'entities', 'shared'],
            },
            {
              from: 'widgets',
              allow: [
                'features',
                'entities',
                'shared',
                ['widgets', { sliceName: '${from.sliceName}' }],
              ],
              disallow: [['widgets', { sliceName: '!${from.sliceName}' }]],
              message:
                '${from.sliceName} 슬라이스는 ${dependency.sliceName} 슬라이스를 참조할 수 없습니다.',
            },
            {
              from: 'features',
              allow: ['entities', 'shared', ['features', { sliceName: '${from.sliceName}' }]],
              disallow: [['features', { sliceName: '!${from.sliceName}' }]],
              message:
                '${from.sliceName} 슬라이스는 ${dependency.sliceName} 슬라이스를 참조할 수 없습니다.',
            },
            {
              from: 'entities',
              allow: ['shared', ['entities', { sliceName: '${from.sliceName}' }]],
              disallow: [['entities', { sliceName: '!${from.sliceName}' }]],
              message:
                '${from.sliceName} 슬라이스는 ${dependency.sliceName} 슬라이스를 참조할 수 없습니다.',
            },
            {
              from: 'shared',
              allow: ['shared'],
            },
          ],
        },
      ],
    },
  },

  eslintConfigPrettier,
]);

export default eslintConfig;
