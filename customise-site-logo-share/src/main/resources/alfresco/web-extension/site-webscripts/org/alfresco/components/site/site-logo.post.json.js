function main()
{
      var logoId = json.get("console-options-logo");
      var siteId = json.get("siteId");
      if (logoId != null && (logoId = new String(logoId)).length != 0)
      {
        if (logoId == "reset") {
            var connection = remote.connect("alfresco");
            var result = connection.del("/api/site-logo/site/" + encodeURIComponent(siteId));
        }
      }

      model.success = true;
}

main();