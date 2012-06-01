<import resource="classpath:/alfresco/extension/templates/webscripts/org/alfresco/repository/site/site.lib.js">

function main()
{
   try
   {
      var siteId = url.templateArgs.siteId;
      var site = siteService.getSite(siteId);
      var siteLogo = getSiteLogo(site);

      logger.log("Delete " + siteId + " logo");

      model.success = siteLogo.remove();
   }
   catch (e)
   {
      var x = e;
      status.code = 500;
      status.message = "Unexpected error occured during deletion of site logo.";
      if (x.message && x.message.indexOf("org.alfresco.service.cmr.usage.ContentQuotaException") == 0)
      {
         status.code = 413;
         status.message = x.message;
      }
      status.redirect = true;
      return;
   }
}

main();