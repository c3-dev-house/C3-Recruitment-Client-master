import asyncio
import os
import shutil
from pathlib import Path
from playwright.async_api import async_playwright, expect

APP_URL = "http://127.0.0.1:3001"
ROOT = Path("/mnt/c/Users/Louis/Documents/GitHub/C3-Recruitment-Client-master")
OUTPUT_DIR = ROOT / "output" / "recordings"
VIDEO_DIR = OUTPUT_DIR / "raw-video"
CV_PATH = Path("/mnt/c/Users/Louis/Desktop/Convergenc3/Convergenc3 CV 1-Pagers/refine/XP_write_up_Louis_de_Villiers.pdf")
TRANSCRIPT_PATH = Path("/mnt/c/Users/Louis/Desktop/Persoonlik/Ek/SU Academic History.pdf")
FINAL_VIDEO = OUTPUT_DIR / "recruitment-overhaul-full-apply-flow.webm"
FINAL_SCREENSHOT = OUTPUT_DIR / "recruitment-overhaul-final-screen.png"

async def pause(page, ms=650):
    await page.wait_for_timeout(ms)

async def click_next(page):
    await page.get_by_role("button", name="Next").click()
    await pause(page, 850)

async def select_by_index(page, index, value):
    await page.locator("select").nth(index).select_option(value)
    await pause(page, 250)

async def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    if VIDEO_DIR.exists():
        shutil.rmtree(VIDEO_DIR)
    VIDEO_DIR.mkdir(parents=True, exist_ok=True)
    if FINAL_VIDEO.exists():
        FINAL_VIDEO.unlink()

    if not CV_PATH.exists():
        raise FileNotFoundError(f"CV not found: {CV_PATH}")
    if not TRANSCRIPT_PATH.exists():
        raise FileNotFoundError(f"Transcript not found: {TRANSCRIPT_PATH}")

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, slow_mo=90)
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=1,
            record_video_dir=str(VIDEO_DIR),
            record_video_size={"width": 1440, "height": 900},
        )
        page = await context.new_page()

        async def mock_api(route):
            url = route.request.url
            if "restcountries.com/v3.1/all" in url:
                await route.fulfill(json=[{"name": {"common": "South Africa"}}, {"name": {"common": "Netherlands"}}, {"name": {"common": "Other"}}])
                return
            if "/upload" in url:
                await route.fulfill(status=200, json={"result": {"key": "test-recruitment-overhaul/demo-upload.pdf"}})
                return
            if "/authorization/login" in url:
                await route.fulfill(status=200, json={"token": "test-recruitment-overhaul-token"})
                return
            if "/checkRecruitEmail" in url or "/isNewApplicant" in url or "/submit" in url or "/send" in url or "/recruitment/" in url:
                await route.fulfill(status=200, json={"ok": True, "message": "Test Recruitment Overhaul mocked success"})
                return
            await route.continue_()

        await context.route("**/*", mock_api)

        # 1. Listings overview.
        await page.goto(APP_URL, wait_until="networkidle")
        await pause(page, 1700)
        await page.mouse.wheel(0, 480)
        await pause(page, 1100)
        await page.mouse.wheel(0, -480)
        await pause(page, 700)

        # 2. Role detail.
        await page.get_by_role("link", name="View details").first.click()
        await expect(page.get_by_role("heading", name="Senior Full Stack Developer")).to_be_visible(timeout=10000)
        await pause(page, 1300)
        await page.mouse.wheel(0, 520)
        await pause(page, 800)
        await page.mouse.wheel(0, -520)
        await pause(page, 500)

        # 3. Apply -> signup redirect.
        await page.get_by_role("button", name="Apply for this role").click()
        await expect(page.get_by_role("heading", name="Sign up once. Apply with continuity.")).to_be_visible(timeout=10000)
        await pause(page, 900)

        signup_inputs = page.locator(".orbital-form input")
        await signup_inputs.nth(0).fill("Test Recruitment Overhaul Louis de Villiers")
        await pause(page, 250)
        await signup_inputs.nth(1).fill("louisdvilliers@gmail.com")
        await pause(page, 250)
        await signup_inputs.nth(2).fill("0821234567")
        await pause(page, 450)
        await page.get_by_role("button", name="Continue").click()

        # 4. Legacy application flow, attached to selected role.
        await expect(page.get_by_text("Target role")).to_be_visible(timeout=10000)
        await pause(page, 1100)

        # Step 1: Personal details.
        await page.locator('input[name="name"]').fill("Test Recruitment Overhaul Louis de Villiers")
        await page.locator('input[name="email"]').fill("louisdvilliers@gmail.com")
        await page.locator('input[name="cell"]').fill("0821234567")
        await page.locator('select[name="nationality"]').select_option("South Africa")
        await page.locator('select').nth(1).select_option("male")
        await page.locator('input[type="date"]').fill("1990-06-01")
        await pause(page, 550)
        await click_next(page)

        # Step 2: Position details.
        await expect(page.get_by_text("Years working experience")).to_be_visible(timeout=10000)
        await select_by_index(page, 0, "3-7")
        await select_by_index(page, 1, "yes")
        await select_by_index(page, 2, "no")
        await select_by_index(page, 3, "LinkedIn")
        await click_next(page)

        # Step 3: Qualification.
        await expect(page.get_by_text("Highest qualification obtained")).to_be_visible(timeout=10000)
        await select_by_index(page, 0, "Bachelors of Commerce")
        await select_by_index(page, 1, "2016")
        await select_by_index(page, 2, "Other")
        await page.get_by_placeholder("Please provide university").fill("Stellenbosch University")
        await pause(page, 550)
        await click_next(page)

        # Step 4: Availability.
        await expect(page.get_by_text("Current area of residence")).to_be_visible(timeout=10000)
        await select_by_index(page, 0, "western cape")
        await page.locator('input[name="yes"]').check()
        await select_by_index(page, 1, "R80 000 +")
        await select_by_index(page, 2, "I can start immediately")
        await pause(page, 550)
        await click_next(page)

        # Step 5: Background/Profile.
        await expect(page.get_by_text("GitHub or portfolio link")).to_be_visible(timeout=10000)
        await page.locator('textarea[name="experience"]').fill(
            "Test Recruitment Overhaul I am drawn to building systems where strong engineering turns operational ambiguity into usable products. I care about clean interfaces, automation, and AI-enabled workflows that help teams move with more confidence."
        )
        await pause(page, 250)
        await page.locator('textarea[name="goals"]').fill(
            "Test Recruitment Overhaul I want to help C3 ship polished recruitment and delivery systems, keep learning across AI product and engineering, and turn rough ideas into measurable internal tools."
        )
        # Leave GitHub/portfolio blank to demonstrate that the field is optional.
        await page.locator('input[name="no"]').check()
        await pause(page, 800)
        await click_next(page)

        # Step 6: Upload + consent.
        await expect(page.get_by_text("Upload your CV")).to_be_visible(timeout=10000)
        await page.locator("#myFile").set_input_files(str(CV_PATH))
        await pause(page, 700)
        await page.locator("#transcript").set_input_files(str(TRANSCRIPT_PATH))
        await pause(page, 700)
        await page.locator("#consent").check()
        await pause(page, 800)
        await click_next(page)

        # Step 7: Submission screen.
        await expect(page.get_by_text("Submission Complete!")).to_be_visible(timeout=15000)
        await pause(page, 2500)
        await page.screenshot(path=str(FINAL_SCREENSHOT), full_page=True)

        await context.close()
        await browser.close()

    videos = sorted(VIDEO_DIR.glob("*.webm"), key=lambda p: p.stat().st_mtime, reverse=True)
    if not videos:
        raise RuntimeError("No Playwright video was produced.")
    shutil.copy2(videos[0], FINAL_VIDEO)
    print(f"VIDEO={FINAL_VIDEO}")
    print(f"SCREENSHOT={FINAL_SCREENSHOT}")
    print(f"SIZE_BYTES={FINAL_VIDEO.stat().st_size}")

if __name__ == "__main__":
    asyncio.run(main())
