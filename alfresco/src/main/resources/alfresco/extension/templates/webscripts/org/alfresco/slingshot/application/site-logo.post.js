/**
 * Application Log Upload method
 * 
 * @method POST
 * @param filedata {file}
 */

function main()
{
   try
   {
	  logger.log("Uploading new site logo");
	  
      var filename = "site_logo";
      var content = null;
      var site = url.templateArgs.site;
      
      logger.log("Site: " + site);
      
      // locate file attributes
      for each (field in formdata.fields)
      {
         if (field.name == "filedata" && field.isFile)
         {
            content = field.content;
            break;
         }
      }
      
      logger.log("got content");
      
      // ensure all mandatory attributes have been located
      if (content == undefined)
      {
         status.code = 400;
         status.message = "Uploaded file cannot be located in request";
         status.redirect = true;
         return;
      }
      
      logger.log("good content");
      
      logger.log("site: " + site);
      var siteNode = siteService.getSite(site);
      logger.log(siteNode);
      if (siteNode == null) {
    	  status.code = 500;
    	  status.message = "Failed to find site";
    	  stauts.redirect = true;
    	  return;
      }
      
      logger.log("got site node");
      
      logoNode = siteNode.createNode(filename, "cm:content");
      logoNode.properties.content.write(content);
      logoNode.properties.content.guessMimetype(filename);
      logoNode.save();
      
      logger.log("saved node");
      
      // save ref to be returned
      model.logo = logoNode;
      model.name = filename;
   }
   catch (e)
   {
      var x = e;
      status.code = 500;
      status.message = "Unexpected error occured during upload of new content.";
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