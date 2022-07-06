using Sabio.Models;
using Sabio.Models.Domain.NewsletterSubscriptions;
using Sabio.Models.Requests.NewsletterSubscriptions;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface INewsletterSubscriptionService
    {
        string AddNewsletterSubscription(NewsletterSubscriptionAddRequest model);
        NewsletterSubscription GetSubStatusByEmail(string email);
        List<NewsletterSubscription> GetSubbedEmails(bool isSubscribed);
        Paged<NewsletterSubscription> GetEmailsPaginated(int pageIndex, int pageSize);
        Paged<NewsletterSubscription> GetSubscribersPaginated(int pageIndex, int pageSize, bool isSubscribed);
        Paged<NewsletterSubscription> SearchSubscribersPaginated(int pageIndex, int pageSize, string query, bool isSubscribed);
        void UpdateSubStatus(NewsletterSubscriptionUpdateRequest model);
    }
}
