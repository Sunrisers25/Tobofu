import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        
        # Listen for console events
        page.on('console', lambda msg: print(f'Browser Console: {msg.text}'))
        
        # Go to a page first to set localStorage on that origin
        await page.goto('http://localhost:3000/login', wait_until='networkidle')
        await page.evaluate("window.localStorage.setItem('user_id', '2');")
        
        # Now go to discover page where Navbar loads notifications
        await page.goto('http://localhost:3000/discover', wait_until='networkidle')
        await page.wait_for_timeout(2000)
        
        # Check what the debug div says
        try:
            debug_text = await page.locator('.bg-red-500').inner_text()
            print(f'Debug Div Content: {debug_text}')
        except Exception as e:
            print('Could not find debug div')
            
        await browser.close()

asyncio.run(run())
