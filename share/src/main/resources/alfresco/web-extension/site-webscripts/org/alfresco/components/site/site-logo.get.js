function main()
{
   var siteLogo = "",
      result,
      response;

   var siteId = page.url.templateArgs.site || "";
   if (siteId !== "")
   {
      result = remote.call("/api/sites/" + encodeURIComponent(siteId));
      if (result.status == 200 && result != "{}")
      {
         response = eval('(' + result + ')');
         siteLogo = response.siteLogo;
         
         if (typeof siteLogo != "string")
         {
        	 siteLogo = "";
         }
      }
   }
   model.logo = siteLogo;
}

main();