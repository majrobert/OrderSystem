using Microsoft.AspNetCore.Identity;
using Polnet_api.Data;
using Polnet_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polnet_api
{
    public class Seed
    {
       public static async Task SeeData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName="Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                     new AppUser
                    {
                        DisplayName="Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                      new AppUser
                    {
                        DisplayName="Jane",
                        UserName = "Jane",
                        Email = "jane@test.com"
                    },
                };
                foreach(var user in users)
                {
                  await  userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
        }
    }
}
