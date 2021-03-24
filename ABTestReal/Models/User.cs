using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ABTestReal.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string DateRegistration { get; set; }
        public Boolean DateRegistrationValid { get; set; }
        public string DateLastActivity { get; set; }
        public Boolean DateLastActivityValid { get; set; }
    }
}
