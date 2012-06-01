var SITE_LOGO = "site_logo";

function getSiteLogo(site) {
    return site.node.childByNamePath(SITE_LOGO);
}