const catalog = require("../config/apps.json");
module.exports = function handler(req,res) {
  res.setHeader("Cache-Control","public, s-maxage=300");
  return res.status(200).json({apps:catalog.apps.map(({id,name})=>({id,name}))});
};
