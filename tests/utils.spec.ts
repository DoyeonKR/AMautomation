// import { test } from '@playwright/test';

// test('Apple 로그인 세션 저장', async ({ page }) => {
//   await page.goto('/');

//   await page.getByRole('link', { name: '로그인' }).click();
//   await page.getByRole('button', { name: '개인회원' }).click();

//   // Apple 계정 로그인 팝업 처리 (새 창)
//   const page1Promise = page.waitForEvent('popup');
//   await page.getByRole('button', { name: '애플 계정으로 로그인' }).click();

//   const page1 = await page1Promise;
// //   await page1.getByRole('textbox', { name: '이메일 또는 전화번호' }).click();

//   // 👉 여기서 아이디, 비번, 인증번호를 직접 수동으로 입력
//   await page1.pause(); 
//   // Inspector에서 로그인 끝까지 하고 세션 완성시켜

//   // 로그인된 상태 저장
//   await page.context().storageState({ path: 'apple-login.json' });
// });
