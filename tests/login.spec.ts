import { test, expect } from '@playwright/test';

const ALBAMON_ID = process.env.ALBAMON_ID;
const ALBAMON_PW = process.env.ALBAMON_PW;
if (!ALBAMON_ID || !ALBAMON_PW) throw new Error('환경변수 ALBAMON_ID / ALBAMON_PW 를 설정하세요.');

test('PC_001 개인 알바몬 계정 로그인', async ({ page }) => {

  await page.goto('https://www.albamon.com/');

  await page.getByRole('link', { name: '로그인' }).click();

  await page.getByRole('button', { name: '개인회원' }).click();

  await page.getByRole('textbox', { name: '아이디' }).click();

  await page.getByRole('textbox', { name: '아이디' }).fill(ALBAMON_ID);

  await page.getByRole('textbox', { name: '비밀번호' }).click();

  await page.getByRole('textbox', { name: '비밀번호' }).fill(ALBAMON_PW);

  await page.getByRole('button', { name: '로그인', exact: true }).click();

  await expect(page.getByRole('button', { name: 'r-gg05' })).toBeVisible();

  await page.getByRole('button', { name: 'r-gg05' }).click();

  // ...existing code...
  // 기존 클릭 대신 디버그 코드
  // console.log('buttons:', await page.getByRole('button').allTextContents());
  // await page.pause(); // Playwright Inspector로 실제 DOM/ARIA 확인

  // 더 넓은 셀렉터(버튼 또는 링크)로 시도
  const logout = page.locator('button:has-text("로그아웃"), a:has-text("로그아웃")');
  await logout.click();
// ...existing code...

  await expect(page).toHaveURL('https://www.albamon.com/user-account/login?linkType=logout&memberType=PERSONAL');
});