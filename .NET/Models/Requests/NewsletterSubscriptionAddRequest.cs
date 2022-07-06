using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.NewsletterSubscriptions
{
    public class NewsletterSubscriptionAddRequest
    {
        [Required]
        [StringLength(255, MinimumLength = 3)]
        public string Email { get; set; }
        [Required]
        public bool IsSubscribed { get; set; }
    }
}
