import React, { useState, useEffect } from 'react';
import logger from 'debug';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import newsletterSubscriptionService from '../../services/newsletterSubscriptionService';
import ASubscriber from './ASubscriber';
import { Formik, Form, Field } from 'formik';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

const NewsletterSubscribers = () => {
    const _logger = logger.extend('NewsletterSubscribers');

    const [subscriberData, setSubscriberData] = useState({
        subscribers: [],
        mappedSubscribers: [],
        pageIndex: 0,
        pageSize: 10,
        countOfSubscribers: 0,
        current: 1,
    });
    const [query] = useState({ string: '' });

    useEffect(() => {
        _logger('I am in useEffect');

        newsletterSubscriptionService
            .getSubscribersPaginated(subscriberData.pageIndex, subscriberData.pageSize, true)
            .then(onGetSubscribersSuccess)
            .catch(onGetSubscribersError);
    }, [subscriberData.pageIndex]);

    const onGetSubscribersSuccess = (values) => {
        _logger('Page of Subscribers: ', values.item.pagedItems);

        const subscribersArray = values.item.pagedItems;
        _logger('subscribersArray: ', subscribersArray);

        setSubscriberData((prevState) => {
            const pd = { ...prevState };
            pd.subscribers = subscribersArray;
            pd.mappedSubscribers = subscribersArray.map(mapSubscriber);
            pd.countOfItems = values.item.totalCount;
            return pd;
        });
    };

    const onGetSubscribersError = (message) => {
        _logger('Get Subscribers Error: ' + message);
    };

    const onPaginateClicked = (page) => {
        setSubscriberData((prevState) => {
            let pg = { ...prevState };
            pg.current = page;
            pg.pageIndex = page - 1;
            return pg;
        });
    };

    const onSearch = (values) => {
        _logger('Value: ', values.string);
        newsletterSubscriptionService
            .getSubscribersSearchPaginated(subscriberData.pageIndex, subscriberData.pageSize, values.string, true)
            .then(onSearchSuccess)
            .catch(onSearchError);
    };

    const onSearchSuccess = (value) => {
        const subscribersArray = value.item.pagedItems;
        _logger('search subscribersArray: ', subscribersArray);
        setSubscriberData((prevState) => {
            const pd = { ...prevState };
            pd.subscribers = subscribersArray;
            pd.mappedSubscribers = subscribersArray.map(mapSubscriber);
            pd.countOfItems = value.item.totalCount;
            return pd;
        });
    };

    const onSearchError = (err) => {
        _logger(err);
    };

    const mapSubscriber = (aRecord, index) => <ASubscriber record={aRecord} key={index} />;
    return (
        <React.Fragment>
            <Container className="account-pages pt-1 pt-sm-3 pb-2 pb-sm-3">
                <Row className="justify-content-center">
                    <Col md={16} lg={12} xl={10} xxl={8}>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <h2 className="header-title">Subscribed Emails:</h2>
                                    </Col>
                                    <Col>
                                        <Formik enableReinitialize={true} initialValues={query} onSubmit={onSearch}>
                                            <Form>
                                                <div>
                                                    <Field
                                                        type="text"
                                                        name="string"
                                                        className="form-control p"
                                                        placeholder="Search by email or date created..."
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary">
                                                    Search
                                                </button>
                                            </Form>
                                        </Formik>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Table className="mb-0 text-center" bordered>
                                            <thead>
                                                <tr>
                                                    <th>Email</th>
                                                    <th>Date Created</th>
                                                    <th>Unsubscribe</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subscriberData.mappedSubscribers && subscriberData.mappedSubscribers}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col>
                                        <Pagination
                                            onChange={onPaginateClicked}
                                            current={subscriberData.current}
                                            pageSize={subscriberData.pageSize}
                                            total={subscriberData.countOfItems}
                                        />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default NewsletterSubscribers;
