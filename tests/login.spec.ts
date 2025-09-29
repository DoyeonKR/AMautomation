import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
/*
  dotenv를 사용하여 .env 파일에서 환경 변수를 로드합니다.
  .env 파일은 프로젝트 루트 디렉토리에 위치해야 하며, git 등 버전 관리 시스템에 포함되지 않도록 .gitignore에 추가하는 것이 좋습니다.
  
  .env 파일 예시:
  ALBAMON_ID=your_id_here
  ALBAMON_PW=your_password_here
*/

const ALBAMON_ID = process.env.ALBAMON_ID;
const ALBAMON_PW = process.env.ALBAMON_PW;
const APPLE_ID = process.env.Apple_ID;
const APPLE_PW = process.env.Apple_PW;

if (!ALBAMON_ID || !ALBAMON_PW) {
  throw new Error('환경변수 ALBAMON_ID / ALBAMON_PW 를 설정하세요.');
}

if (!APPLE_ID || !APPLE_PW) {
  throw new Error('환경변수 ALBAMON_ID / ALBAMON_PW 를 설정하세요.');
}

test('PC_001 개인 알바몬 계정 로그인', async ({ page }) => {

  await page.goto('/');

  await page.getByRole('link', { name: '로그인' }).click();
  await page.getByRole('button', { name: '개인회원' }).click();
  await page.getByRole('textbox', { name: '아이디' }).click();
  await page.getByRole('textbox', { name: '아이디' }).fill(ALBAMON_ID);
  await page.getByRole('textbox', { name: '비밀번호' }).click();
  await page.getByRole('textbox', { name: '비밀번호' }).fill(ALBAMON_PW);
  await page.getByRole('button', { name: '로그인', exact: true }).click();
  await page.getByRole('button', { name: 'r-gg05님' }).click();
  const logout = page.locator('button:has-text("로그아웃"), a:has-text("로그아웃")');
  await logout.click();
// ...existing code...

  await expect(page).toHaveURL('https://www.albamon.com/user-account/login?linkType=logout&memberType=PERSONAL');

});

test('PC_002 Apple 계정 로그인', async ({ page }) => {

  await page.goto('/');

  await page.getByRole('link', { name: '로그인' }).click();
  await page.getByRole('button', { name: '개인회원' }).click();

  // Apple 계정 로그인 팝업 처리 (새 창)
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    // 애플 로그인 버튼 클릭
    page.getByRole('button', { name: '애플 계정으로 로그인' }).click(),    
  ]);    

  await popup.getByRole('textbox', { name: 'Email or Phone Number' }).fill(APPLE_ID);

  await popup.getByRole('button', { name: 'Continue' }).click();
  await popup.getByRole('textbox', { name: 'Password' }).click();
  await popup.getByRole('textbox', { name: 'Password' }).fill(APPLE_PW);

  await popup.getByRole('button', { name: 'Sign In', exact: true }).click();

  await popup.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByRole('button', { name: 'AP_49187941님' })).toBeVisible();

});