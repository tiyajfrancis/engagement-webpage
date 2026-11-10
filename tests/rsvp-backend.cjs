const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
function backend(fail=false) {
 const rows=[['header']]; let locked=false;
 const sheet={getLastRow:()=>rows.length,getRange:(row,col)=>({
  createTextFinder:id=>({matchEntireCell:()=>({findNext:()=>{const n=rows.findIndex(r=>r[1]===id);return n<0?null:{getRow:()=>n+1};}})}),
  setValues:([data])=>{if(fail)throw Error('private error');rows[row-1]=data;}
 })};
 const context={SpreadsheetApp:{openById:()=>({getSheetByName:()=>sheet}),flush:()=>{}},
 PropertiesService:{getScriptProperties:()=>({getProperty:()=> 'private-sheet'})},
 LockService:{getScriptLock:()=>({waitLock:()=>locked=true,hasLock:()=>locked,releaseLock:()=>locked=false})},
 ContentService:{MimeType:{JSON:'json'},createTextOutput:text=>({setMimeType:()=>JSON.parse(text)})}};
 vm.createContext(context);vm.runInContext(fs.readFileSync('backend/Code.gs','utf8'),context);
 return {post:p=>context.doPost({parameter:p}),rows,locked:()=>locked};
}
const valid={responseId:'12345678-1234-4234-8234-123456789abc',name:'Guest',attendance:'yes',guests:'2',message:'Hello',language:'en'};
test('saves, acknowledges and updates a retry without duplicate rows',()=>{const b=backend(); assert.equal(b.post(valid).ok,true);assert.equal(b.post({...valid,guests:'3'}).ok,true);assert.equal(b.rows.length,2);assert.equal(b.rows[1][4],3);assert.equal(b.locked(),false);});
test('declines have zero guests and formula input is inert',()=>{const b=backend();assert.equal(b.post({...valid,attendance:'no',guests:'0',name:'=IMPORTXML("url")',message:'+formula'}).ok,true);assert.equal(b.rows[1][4],0);assert.ok(b.rows[1][2].startsWith("'="));assert.ok(b.rows[1][5].startsWith("'+"));});
test('rejects malformed input and honeypot without storage',()=>{for(const patch of [{name:' '},{guests:'6'},{guests:'1.5'},{attendance:'maybe'},{attendance:'no',guests:'1'},{message:'x'.repeat(1001)},{website:'spam'},{responseId:'bad'},{language:'xx'}]){const b=backend();assert.equal(b.post({...valid,...patch}).ok,false);assert.equal(b.rows.length,1);}});
test('storage errors never acknowledge success or expose details; lock released',()=>{const b=backend(true);assert.deepEqual(JSON.parse(JSON.stringify(b.post(valid))),{ok:false});assert.equal(b.locked(),false);});
