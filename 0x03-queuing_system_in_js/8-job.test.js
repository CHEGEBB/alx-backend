#!/usr/bin/yarn test

import sinon from 'sinon';
import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  const BIG_BROTHER = sinon.spy(console);
  let QUEUE;

  before(() => {
    QUEUE = kue.createQueue({ name: 'push_notification_code_test' });
    QUEUE.testMode.enter();
  });

  after(() => {
    QUEUE.testMode.clear();
    QUEUE.testMode.exit();
  });

  afterEach(() => {
    BIG_BROTHER.log.resetHistory();
  });

  it('displays an error message if jobs is not an array', () => {
    expect(
      createPushNotificationsJobs.bind(createPushNotificationsJobs, {}, QUEUE)
    ).to.throw('Jobs is not an array');
  });

  it('adds jobs to the queue with the correct type', (done) => {
    const jobInfos = [
      {
        phoneNumber: '44556677889',
        message: 'Use the code 1982 to verify your account',
      },
      {
        phoneNumber: '98877665544',
        message: 'Use the code 1738 to verify your account',
      },
    ];

    createPushNotificationsJobs(jobInfos, QUEUE);

    // Ensure jobs have been added
    setImmediate(() => {
      const jobs = QUEUE.testMode.jobs;
      expect(jobs.length).to.equal(2);

      const job = jobs[0];
      expect(job.data).to.deep.equal(jobInfos[0]);
      expect(job.type).to.equal('push_notification_code_3');

      QUEUE.process('push_notification_code_3', (job, done) => {
        done(); // Complete the job
      });

      job.on('complete', () => {
        expect(BIG_BROTHER.log.calledWith('Notification job created:', job.id)).to.be.true;
        done();
      });
    });
  });

  it('registers the progress event handler for a job', (done) => {
    createPushNotificationsJobs([{ phoneNumber: '44556677889', message: 'Test message' }], QUEUE);

    setImmediate(() => {
      const job = QUEUE.testMode.jobs[0];
      job.on('progress', (progress) => {
        expect(BIG_BROTHER.log.calledWith('Notification job', job.id, '25% complete')).to.be.true;
        done();
      });
      job.emit('progress', 25);
    });
  });

  it('registers the failed event handler for a job', (done) => {
    createPushNotificationsJobs([{ phoneNumber: '44556677889', message: 'Test message' }], QUEUE);

    setImmediate(() => {
      const job = QUEUE.testMode.jobs[0];
      job.on('failed', (err) => {
        expect(BIG_BROTHER.log.calledWith('Notification job', job.id, 'failed:', err.message)).to.be.true;
        done();
      });
      job.emit('failed', new Error('Failed to send'));
    });
  });

  it('registers the complete event handler for a job', (done) => {
    createPushNotificationsJobs([{ phoneNumber: '44556677889', message: 'Test message' }], QUEUE);

    setImmediate(() => {
      const job = QUEUE.testMode.jobs[0];
      job.on('complete', () => {
        expect(BIG_BROTHER.log.calledWith('Notification job', job.id, 'completed')).to.be.true;
        done();
      });
      job.emit('complete');
    });
  });
});
