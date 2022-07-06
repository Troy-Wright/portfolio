import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logger from 'debug';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Container, Col, Row } from 'react-bootstrap';
import { AiOutlineMail } from 'react-icons/ai';
import { BiBuildingHouse } from 'react-icons/bi';
import { BsNewspaper, BsCashCoin } from 'react-icons/bs';
import { SiYourtraveldottv } from 'react-icons/si';
import newsletter from '../../assets/images/newsletter.svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import newsletterSubscriptionSchema from '../../schema/newsletterSubscriptionSchema';
import newsletterSubscriptionService from '../../services/newsletterSubscriptionService';
import '../../assets/scss/newslettersubscription.scss';

const NewsletterSubscription = () => {
    const _logger = logger.extend('NewsletterSubscription');

    const [subscriberState] = useState({
        email: '',
        isSubscribed: true,
    });

    const onSubmit = (values) => {
        _logger('Payload Data:', values);
        newsletterSubscriptionService.getSubscriberStatus(values.email).then(onGetEmailSuccess).catch(onGetEmailError);
        subscriberState.email = values.email;
    };

    const onGetEmailSuccess = (values) => {
        _logger('Get email success, values:', values.item);
        if (!values.item.isSubscribed) {
            newsletterSubscriptionService
                .updateSubscription(subscriberState)
                .then(onSubscribeSuccess)
                .catch(onSubscribeError);
        } else {
            onSubscribeError();
        }
    };

    const onGetEmailError = (message) => {
        _logger('Get email error:' + message);
        _logger('State:', subscriberState);
        newsletterSubscriptionService.add(subscriberState).then(onSubscribeSuccess).catch(onSubscribeError);
    };

    const onSubscribeSuccess = () => {
        toast.success('Subscribed! Keep an eye on your email for news an updates from Kommu!');
    };

    const onSubscribeError = (message) => {
        _logger('Email subscrib error:' + message);
        toast.warning('You are already a part of our newsletter!');
    };
    return (
        <>
            <section className="py-5 bg-light">
                <Container>
                    <Col>
                        <div className="text-center">
                            <h1 className="mt-0">
                                <BsNewspaper />
                            </h1>
                            <h3 className="text-dark">
                                Check out our <span className="landing-titles-span">newsletter</span>
                            </h3>
                            <p className="text-muted mt-2 mb-4">Stay up to date on all things Kommu</p>
                        </div>
                    </Col>
                    <Row className="m-2 align-items-center">
                        <Col lg={6}>
                            <img src={newsletter} className="img-fluid" alt="Newsletter" />
                        </Col>
                        <Col lg={6}>
                            <div className="m-4 d-flex gap-4 align-items-center">
                                <SiYourtraveldottv size="50px" />
                                <span className="text-dark fs-4">
                                    Receive exclusive offers for discounts on flights, tours, restaurants, and more.
                                </span>
                            </div>
                            <div className="m-4 d-flex gap-4 align-items-center">
                                <BsCashCoin size="50px" />
                                <span className="text-dark fs-4">
                                    Get updates on new members to the Kommunity whose residence matches with your
                                    home&#39;s point value.
                                </span>
                            </div>
                            <div className="m-4 d-flex gap-4 align-items-center">
                                <BiBuildingHouse size="50px" />
                                <span className="text-dark fs-4">
                                    Learn about what other members are doing to cost effectively increase the point
                                    value of their property.
                                </span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Formik
                                enableReinitialize={true}
                                initialValues={subscriberState}
                                onSubmit={onSubmit}
                                validationSchema={newsletterSubscriptionSchema}>
                                <Form>
                                    <div className="mt-4">
                                        <Field
                                            type="email"
                                            name="email"
                                            className="form-control subscription-form"
                                            placeholder="Email*"
                                            autoComplete="email"
                                        />
                                        <div>
                                            &nbsp;
                                            <ErrorMessage name="email" component="span" className="text-muted" />
                                        </div>
                                    </div>
                                    <div className="mb-3 text-center">
                                        <button type="submit" className="btn btn-success btn-sm">
                                            <AiOutlineMail /> Subscribe
                                        </button>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-muted">
                                            By subscribing, you consent to news and updates from Kommu
                                        </p>
                                        <p className="text-muted">
                                            <Link to={'/unsubscribe'} className="text-muted ms-1">
                                                <b>Unsubscribe from our newsletter</b>
                                            </Link>
                                        </p>
                                    </div>
                                </Form>
                            </Formik>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

NewsletterSubscription.propTypes = {
    subscriptionStatus: PropTypes.shape({
        email: PropTypes.string.isRequired,
        isSubscribed: PropTypes.bool.isRequired,
    }),
};

export default NewsletterSubscription;
