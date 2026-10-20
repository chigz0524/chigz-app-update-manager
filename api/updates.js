const catalog = require("../config/apps.json");
module.exports = async function handler(req,res) {
  res.setHeader("Cache-Control","public, s-maxage=60, stale-while-revalidate=300");
  const appId = String(req.query?.appId || "").trim();
  if (!appId) return res.status(400).json({error:"appId is required"});
  const app = catalog.apps.find(a=>a.id===appId);
  if (!app) return res.status(404).json({error:"Unknown app ID"});
  try {
    const response = await fetch("https://api.github.com/repos/"+app.repo+"/releases/latest", {
      headers: {"Accept":"application/vnd.github+json","User-Agent":"CHIGZ-App-Update-Manager","X-GitHub-Api-Version":"2022-11-28"},
      signal: AbortSignal.timeout(9000)
    });
    if (response.status===404) return res.status(404).json({error:"No published release",appId});
    if (!response.ok) return res.status(502).json({error:"Release service unavailable"});
    const data=await response.json();
    const assets=(data.assets||[]).filter(a=>/\.(apk|exe)$/i.test(a.name)).map(a=>({name:a.name,url:a.browser_download_url,size:a.size,download_count:a.download_count}));
    return res.status(200).json({appId,name:app.name,version:data.tag_name,releaseDate:data.published_at,notes:data.body||"",releaseUrl:data.html_url,assets});
  } catch(e) {return res.status(502).json({error:"Could not check for updates"});}
};
