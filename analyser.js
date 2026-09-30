function analyse(){
  let file = document.getElementById('emlFile').files[0];
  let paste = document.getElementById('pasteBox').value;
  if(file){
    let reader = new FileReader();
    reader.onload = e => runAnalysis(e.target.result);
    reader.readAsText(file);
  } else if(paste){
    runAnalysis(paste);
  } else { alert("Upload.eml or paste email"); }
}
function runAnalysis(raw){
  let score=0, flags=[]; raw=raw.toLowerCase();
  const fromMatch=raw.match(/from:.*@(.*)/);
  const replyTo=raw.match(/reply-to:.*@(.*)/);
  if(replyTo && fromMatch && replyTo[1]!==fromMatch[1]){
    score+=25; flags.push(`Reply-To mismatch: ${replyTo[1]} vs From ${fromMatch[1]}`);
  }
  if(raw.includes("spf=fail")||raw.includes("dmarc=fail")||raw.includes("dkim=fail")){
    score+=20; flags.push("SPF/DKIM/DMARC fail");
  }
  ["urgent","verify your account","suspended","wire transfer","gift card","account will be closed"].forEach(k=>{
    if(raw.includes(k)){ score+=10; flags.push(`Keyword: "${k}"`); }
  });
  const urls=raw.match(/https?:\/\/[^\s<"']+/g)||[];
  urls.forEach(url=>{
    try{
      const u=new URL(url);
      if(/^\d+\.\d+\.\d+\.\d+/.test(u.hostname)){ score+=20; flags.push(`IP URL: ${url}`); }
      if(["bit.ly","tinyurl.com","goo.gl","is.gd","t.me"].some(s=>u.hostname.includes(s))){ score+=15; flags.push(`Shortener: ${url}`); }
      if([".tk",".ml",".ga",".cf",".gq",".xyz"].some(t=>u.hostname.endsWith(t))){ score+=10; flags.push(`Suspicious TLD: ${url}`); }
    }catch(e){}
  });
  let verdict="",cls="";
  if(score>=60){ verdict="PHISHING"; cls="phish"; }
  else if(score>=25){ verdict="SUSPICIOUS"; cls="susp"; }
  else { verdict="CLEAN"; cls="clean"; }
  document.getElementById('result').style.display="block";
  document.getElementById('result').innerHTML=`<h2>Score: ${score}/100 <span class="badge ${cls}">${verdict}</span></h2>${flags.map(f=>`<div class=flag>${f}</div>`).join('')}`;
}
