<import resource="classpath:/alfresco/extension/templates/webscripts/org/alfresco/repository/site/site.lib.js">

function main()
{
   // Get the shortname
   var shortName = url.extension;
   
   // Get the site
   var site = siteService.getSite(shortName);
   
   if (site != null)
   {
      // Pass the site to the template
      model.site = site;
      var siteLogo = getSiteLogo(site);
      if (siteLogo != null) {
    	  logger.log("Found site logo: " + siteLogo.nodeRef);
    	  model.siteLogo = siteLogo;
      }
   }
   else
   {
      // Return 404
      status.setCode(404, "Site " + shortName + " does not exist");
      return;
   }
}

main();