using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.NewsletterSubscriptions;
using Sabio.Models.Requests.NewsletterSubscriptions;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class NewsletterSubscriptionService : INewsletterSubscriptionService
    {
        IDataProvider _data = null;
        public NewsletterSubscriptionService(IDataProvider data)
        {
            _data = data;
        }
        public string AddNewsletterSubscription(NewsletterSubscriptionAddRequest model)
        {
            string procName = "[dbo].[NewsletterSubscriptions_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    AddCommonParameters(model, parameterCollection);
                });
            return model.Email;
        }

        public NewsletterSubscription GetSubStatusByEmail(string email)
        {
            NewsletterSubscription subscriber = null;

            string procName = "[dbo].[NewsletterSubscriptions_SelectByEmail]";

            _data.ExecuteCmd(procName, (SqlParameterCollection col) =>
            {
                col.AddWithValue("@Email", email);
            }, (IDataReader reader, short set) =>
            {
                int index = 0;
                subscriber = MapSingleNewsSubscription(reader, ref index);
            });
            return subscriber;
        }

        public List<NewsletterSubscription> GetSubbedEmails(bool isSubscribed)
        {
            string procName = "[dbo].[NewsletterSubscriptions_SelectAll_Subscribed]";

            List<NewsletterSubscription> result = null;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@IsSubscribed", isSubscribed);
            }
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                NewsletterSubscription aNewsletterSubscription = MapSingleNewsSubscription(reader, ref startingIndex);

                if (result == null)
                {
                    result = new List<NewsletterSubscription>();
                }
                result.Add(aNewsletterSubscription);
            });
            return result;
        }

        public Paged<NewsletterSubscription> GetEmailsPaginated(int pageIndex, int pageSize)
        {
            Paged<NewsletterSubscription> pagedResult = null;
            List<NewsletterSubscription> result = null;

            int totalCount = 0;
            string procName = "[dbo].[NewsletterSubscriptions_SelectAllPaginated]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                NewsletterSubscription subscriber = new NewsletterSubscription();

                int startingIndex = 0;

                subscriber = MapSingleNewsSubscription(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (result == null)
                {
                    result = new List<NewsletterSubscription>();
                }
                result.Add(subscriber);
            });
            if (result != null)
            {
                pagedResult = new Paged<NewsletterSubscription>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public Paged<NewsletterSubscription> GetSubscribersPaginated(int pageIndex, int pageSize, bool isSubscribed)
        {
            Paged<NewsletterSubscription> pagedResult = null;
            List<NewsletterSubscription> result = null;

            int totalCount = 0;
            string procName = "[dbo].[NewsletterSubscriptions_Subscribers_Paginated]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
                parameterCollection.AddWithValue("@IsSubscribed", isSubscribed);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                NewsletterSubscription subscriber = new NewsletterSubscription();

                int startingIndex = 0;

                subscriber = MapSingleNewsSubscription(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (result == null)
                {
                    result = new List<NewsletterSubscription>();
                }
                result.Add(subscriber);
            });
            if (result != null)
            {
                pagedResult = new Paged<NewsletterSubscription>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public Paged<NewsletterSubscription> SearchSubscribersPaginated(int pageIndex, int pageSize, string query, bool isSubscribed)
        {
            Paged<NewsletterSubscription> pagedResult = null;
            List<NewsletterSubscription> result = null;

            int totalCount = 0;
            string procName = "[dbo].[NewsletterSubscriptions_Search_Paginate_Subscribed]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
                parameterCollection.AddWithValue("@Query", query);
                parameterCollection.AddWithValue("@IsSubscribed", isSubscribed);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                NewsletterSubscription subscriber = new NewsletterSubscription();

                int startingIndex = 0;

                subscriber = MapSingleNewsSubscription(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (result == null)
                {
                    result = new List<NewsletterSubscription>();
                }
                result.Add(subscriber);
            });
            if (result != null)
            {
                pagedResult = new Paged<NewsletterSubscription>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public void UpdateSubStatus(NewsletterSubscriptionUpdateRequest model)
        {
            string procName = "[dbo].[NewsletterSubscriptions_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    AddCommonParameters(model, parameterCollection);
                }, returnParameters: null);
        }

        private static void AddCommonParameters(NewsletterSubscriptionAddRequest model, SqlParameterCollection parameterCollection)
        {
            parameterCollection.AddWithValue("@Email", model.Email);
            parameterCollection.AddWithValue("@IsSubscribed", model.IsSubscribed);
        }

        private static NewsletterSubscription MapSingleNewsSubscription(IDataReader reader, ref int startingIndex)
        {
            NewsletterSubscription aNewsletterSubscription = new NewsletterSubscription();

            aNewsletterSubscription.Email = reader.GetSafeString(startingIndex++);
            aNewsletterSubscription.IsSubscribed = reader.GetSafeBool(startingIndex++);
            aNewsletterSubscription.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aNewsletterSubscription.DateModified = reader.GetSafeDateTime(startingIndex++);
            return aNewsletterSubscription;
        }
    }
}
