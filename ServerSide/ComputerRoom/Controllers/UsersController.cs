using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BLL;
using DAL;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ComputerRoom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class UsersController : ControllerBase
    {
        private IUsersRepository userRepository;
        public UsersController(IUsersRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpPost("loginUser")]
        public IActionResult LoginUser(LogInUserDTO user)
        {
            // אימות משתמש
            Users u = userRepository.GetUser(user.Name, user.Password); // יש לוודא שהסיסמה מוצפנת
            if (u == null)
                return Unauthorized("User not found or invalid credentials");

            // יצירת טוקן JWT
            var token = GenerateJwtToken(u); // פונקציה ליצירת טוקן

            return Ok(new { Token = token });
        }

        private string GenerateJwtToken(Users u)
        {
            var claims = new[]
            {
               new Claim(ClaimTypes.NameIdentifier, u.Id.ToString()), // הנח ש-u.Id הוא מזהה המשתמש
               new Claim(ClaimTypes.Name, u.Name) // הנח ש-u.Name הוא שם המשתמש
               // ניתן להוסיף כאן תביעות נוספות לפי הצורך
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_super_secret_key_which_is_long_enough\"\""));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "yourIssuer",
                audience: "yourAudience",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30), // ניתן לשנות את זמן התפוגה
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }




        [HttpPost("add")]
        public ActionResult<Users> AddUser(UserDTO u)
        {
            if (u == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (userRepository.GetUser(u.Id) != null)
                return Conflict();
            userRepository.AddUsers(u);

            return CreatedAtAction(nameof(AddUser), new { id = u.Id }, u);
        }


        [HttpPut("update/{id}")]
        public IActionResult Update(int id, UserDTO p)
        {
            if (p == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != p.Id)
            {
                return Conflict();
            }
            userRepository.UpdateUsers(p);
            return Ok(p);
        }

        [HttpDelete("delete/{id}")]

        public IActionResult Delete(int id)
        {
            UserDTO p = userRepository.GetUser(id);
            if (p == null)
                return NotFound("No Users found");
            userRepository.DeleteUsers(id);
            return NoContent();
        }

    }
}
