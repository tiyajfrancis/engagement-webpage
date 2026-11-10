const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:390,height:844}});
 const html=fs.readFileSync('index.html','utf8');let configured=false, mode='ok', requests=0;
 await page.route('**/*',route=>{
  const u=route.request().url();
  if(u==='https://invite.test/')return route.fulfill({contentType:'text/html',body:html});
  if(u.endsWith('/rsvp-config.js'))return route.fulfill({contentType:'text/javascript',body:`window.RSVP_ENDPOINT = '${configured?'https://script.google.com/macros/s/test/exec':''}';`});
  if(u==='https://script.google.com/macros/s/test/exec'){
   requests++; const p=new URLSearchParams(route.request().postData());
   if(mode==='fail')return route.abort();
   return route.fulfill({headers:{'Access-Control-Allow-Origin':'*'},contentType:'application/json',body:JSON.stringify({ok:true,responseId:mode==='wrong'?'wrong':p.get('responseId')})});
  }
  return route.abort();
 });
 await page.goto('https://invite.test/');
 assert.equal(await page.locator('#guest-name').isDisabled(),true);
 configured=true;await page.reload();
 assert.equal(await page.locator('#guest-name').isEnabled(),true);
 await page.locator('#guest-name').fill('Guest');
 await page.locator('[data-attendance="no"]').click();
 assert.equal(await page.locator('#guest-count').isDisabled(),true);
 await page.locator('[type="submit"]').click();
 await page.waitForFunction(()=>document.getElementById('form-status').textContent.includes('saved'));
 await page.locator('#lang-ml').click();
 assert.ok((await page.locator('#form-status').textContent()).includes('സേവ് ചെയ്തു'));
 await page.locator('#lang-en').click();
 for(const failure of ['fail','wrong']){
  mode=failure;await page.locator('[type="submit"]').click();
  await page.waitForFunction(()=>document.getElementById('form-status').textContent.includes('could not confirm'));
  assert.equal(await page.locator('#guest-name').inputValue(),'Guest');
  assert.equal(await page.locator('[type="submit"]').isEnabled(),true);
 }
 assert.equal(requests,3);
 await browser.close();console.log('Browser checks passed: disabled default, activation, decline, confirmed save, language persistence, network and mismatched acknowledgement errors. Transport mocked; real deployment still required.');
})().catch(e=>{console.error(e);process.exitCode=1;});
