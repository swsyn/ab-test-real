using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ABTestReal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ABTestReal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private ApplicationContext db;
        public UsersController(ApplicationContext context)
        {
            db = context;
            if (!db.Users.Any()) {
                db.Users.Add(new User { Id = 1, DateRegistration = "10.01.2021", DateRegistrationValid = true, DateLastActivity = "10.03.2021", DateLastActivityValid = true });
                db.Users.Add(new User { Id = 2, DateRegistration = "05.02.2021", DateRegistrationValid = true, DateLastActivity = "20.03.2021", DateLastActivityValid = true });
                db.SaveChanges();
            }
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return await db.Users.ToListAsync();
        }

        // POST: api/Users
        [HttpPost]
        public void Post(List<User> users)
        {
            foreach (User user in users)
            {
                if (!db.Users.Any(x => x.Id == user.Id))
                {
                    db.Users.Add(user);
                } else
                {
                    db.Update(user);
                }
            }
            db.SaveChanges();
        }
    }
}
