using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;
namespace Test;

    [TestFixture]
    public class TestCreate : PageTest
    {
       [Test]
           public async Task Test1()
           {
               var text = new Random().NextInt64() + "";
        
               await Page.GotoAsync("http://localhost:4200");
           } 
    }
    

    
