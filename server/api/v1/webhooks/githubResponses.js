const webhookRouter = require('express').Router();
const { Submission, User, Challenge } = require('../../../models');
const webhookSendEvents = require('../../../helpers/webhookSendEvents');
const { webhookUrlGithubResponseValidation } = require('../../../helpers/validator');

// github api for update status about submission
webhookRouter.patch('/:id', async (req, res) => {
  try {
    // Joi validation
    const { error } = webhookUrlGithubResponseValidation(req.body);
    if (error) {
      console.error(error.message);
      return res.status(400).json({ success: false, message: error.message });
    }
    const { success } = req.body;
    console.log('success', success);
    console.log('body', req.body);
    const submission = await Submission.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['userName', 'id'],
      }, {
        model: Challenge,
        attributes: ['name'],
      }],
    });
    const updatedSubmission = await submission.update({ state: success ? 'SUCCESS' : 'FAIL' });
    const eventToSend = {
      eventName: 'Submitted Challenge',
      userId: updatedSubmission.userId,
      userName: updatedSubmission.User.userName,
      challengeName: updatedSubmission.Challenge.name,
      submissionState: updatedSubmission.state,
      createdAt: Date.now(),
    };
    webhookSendEvents(eventToSend);
    console.log(eventToSend);
    return res.json(submission);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = webhookRouter;
