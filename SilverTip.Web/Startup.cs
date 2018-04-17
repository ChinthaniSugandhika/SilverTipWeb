using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SilverTip.Web.Startup))]
namespace SilverTip.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
