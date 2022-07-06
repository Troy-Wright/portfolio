using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Utilities;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.NewsletterSubscriptions;
using Sabio.Models.Requests.NewsletterSubscriptions;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/newslettersubscriptions")]
    [ApiController]
    public class NewsletterSubscriptionApiController : BaseApiController
    {
        private INewsletterSubscriptionService _service = null;
        public NewsletterSubscriptionApiController(INewsletterSubscriptionService service
            , ILogger<NewsletterSubscriptionApiController> logger) : base(logger)
        {
            _service = service;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult<ItemResponse<string>> Create(NewsletterSubscriptionAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                string email = _service.AddNewsletterSubscription(model);
                ItemResponse<string> response = new ItemResponse<string>()
                {
                    Item = email
                };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpGet("{email}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<NewsletterSubscription>> GetSubStatusByEmail(string email)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                NewsletterSubscription subscriber = _service.GetSubStatusByEmail(email);

                if (subscriber == null)
                {
                    code = 404;
                    response = new ErrorResponse("No Record Found");
                }
                else
                {
                    response = new ItemResponse<NewsletterSubscription> { Item = subscriber };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("subs")]
        public ActionResult<ItemsResponse<NewsletterSubscription>> Get(bool isSubscribed)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<NewsletterSubscription> result = _service.GetSubbedEmails(isSubscribed);

                if (result == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<NewsletterSubscription> { Items = result };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<NewsletterSubscription>>> GetByPage(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<NewsletterSubscription> paged = _service.GetEmailsPaginated(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<NewsletterSubscription>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code=500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("paginatedsubs")]
        public ActionResult<ItemResponse<Paged<NewsletterSubscription>>> GetSubscribersPaginated(int pageIndex, int pageSize, bool isSubscribed)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<NewsletterSubscription> paged = _service.GetSubscribersPaginated(pageIndex, pageSize, isSubscribed);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<NewsletterSubscription>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<NewsletterSubscription>>> SearchSubscribersPaginated(int pageIndex, int pageSize, string query, bool isSubscribed)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<NewsletterSubscription> paged = _service.SearchSubscribersPaginated(pageIndex, pageSize, query, isSubscribed);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<NewsletterSubscription>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPut("{email}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<bool>> UpdateSubStatus(NewsletterSubscriptionUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateSubStatus(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }
}

