import React, { useState } from 'react';
import logger from 'debug';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import newsletterSubscriptionSchema from '../../schema/newsletterSubscriptionSchema';
import Logo from '../../assets/images/kommusmalllogo.png';
import { Button, Container, Row, Card, Col } from 'react-bootstrap';
import newsletterSubscriptionService from '../../services/newsletterSubscriptionService';
import { toast } from 'react-toastify';
import '../../assets/scss/newslettersubscription.scss';

function Unsubscribe() {
    const _logger = logger.extend('Unsubscribe');

    const [subscriberState] = useState({
        email: '',
        isSubscribed: false,
    });

    const onSubmit = (values) => {
        _logger('values:', values);
        newsletterSubscriptionService.getSubscriberStatus(values.email).then(onGetEmailSuccess).catch(onGetEmailError);
        subscriberState.email = values.email;
    };

    const onGetEmailSuccess = (values) => {
        _logger('Get email success, value props:', values.item);
        _logger('State:', subscriberState);
        if (values.item.isSubscribed) {
            newsletterSubscriptionService
                .updateSubscription(subscriberState)
                .then(onUnsubscribeSuccess)
                .catch(onGetEmailError);
        } else {
            onGetEmailError();
        }
    };

    const onUnsubscribeSuccess = () => {
        toast.success("Unsubscribed... We're sad to see you go!");
    };

    const onGetEmailError = (message) => {
        _logger('Email unsubscribe error:' + message);
        toast.warning("You aren't a part of our newsletter.");
    };
    return (
        <React.Fragment>
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 bg-light">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} xxl={4}>
                            <Card className="p-4">
                                <div className="text-center w-75 m-auto mb-3">
                                    <a href="/">
                                        <img src={Logo} alt="Kommu logo" width="25%" />
                                    </a>
                                    <h1 className="text-center mt-3 display-9">We&#39;re sad to see you go!</h1>
                                    <p className="text-muted">Enter your email below</p>
                                </div>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={subscriberState}
                                    onSubmit={onSubmit}
                                    validationSchema={newsletterSubscriptionSchema}>
                                    <Form>
                                        <div>
                                            <Field
                                                type="text"
                                                name="email"
                                                className="form-control p"
                                                placeholder="Email"
                                                autoComplete="username"
                                            />
                                            <div>
                                                &nbsp;
                                                <ErrorMessage name="email" component="span" className="text-muted" />
                                            </div>
                                        </div>
                                        <div className="mb-3 text-center">
                                            <Button
                                                className="col-12 shadow-none border-0 rounded-pill mt-3"
                                                type="submit"
                                                style={{
                                                    width: '75%',
                                                    backgroundColor: '#634e42',
                                                    height: '40px',
                                                    fontSize: '1.2em',
                                                }}>
                                                Unsubscribe
                                            </Button>
                                        </div>
                                    </Form>
                                </Formik>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default Unsubscribe;
