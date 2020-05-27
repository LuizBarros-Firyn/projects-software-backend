const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const BugReportController = require('./controllers/BugReportController');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const TeamController = require('./controllers/TeamController');
const TeamSettingsController = require('./controllers/TeamSettingsController');
const ProjectController = require('./controllers/ProjectController');
const ProjectTeamAssignmentController = require('./controllers/ProjectTeamAssignmentController');
const OfferController = require('./controllers/OfferController');
const ProjectOfferController = require('./controllers/ProjectOfferController');
const OngoingProjectController = require('./controllers/OngoingProjectController');
const ProjectMessageController = require('./controllers/ProjectMessagecontroller');
const ProjectStateController = require('./controllers/ProjectStateController');
const TeamJoiningSolicitationController = require('./controllers/TeamJoiningSolicitationController');
const TeamJoiningController = require('./controllers/TeamJoiningController');
const TeamMessageController = require('./controllers/TeamMessageController');
const TeamOwnerVerificationController = require('./controllers/TeamOwnerVerificationController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/bug_reports', BugReportController.store);
routes.post('/sessions', SessionController.create);
routes.get('/users', UserController.show);
routes.post('/users', upload.single('photo'), UserController.store);
routes.get('/teams', TeamController.index);
routes.get('/teams/:team_id', TeamController.show);
routes.post('/teams', TeamController.store);
routes.get('/team_settings/:team_id', TeamSettingsController.show);
routes.put('/team_settings/:team_id', TeamSettingsController.put);
routes.get('/team_joining_solicitations', TeamJoiningSolicitationController.index);
routes.post('/team_joining_solicitations', TeamJoiningSolicitationController.store);
routes.post('/team_joinings', TeamJoiningController.store);
routes.delete('/team_joining_solicitations/:team_solicitation_id', TeamJoiningSolicitationController.delete);
routes.get('/team_owner_verifications', TeamOwnerVerificationController.show);
routes.get('/team_messages/:team_id', TeamMessageController.index);
routes.post('/team_messages', TeamMessageController.store);
routes.get('/projects', ProjectController.index);
routes.post('/projects', ProjectController.store);
routes.get('/available_projects', ProjectTeamAssignmentController.index);
routes.get('/projects_offers', ProjectOfferController.index);
routes.get('/offers', OfferController.index);
routes.post('/offers', OfferController.store);
routes.delete('/offers/:offer_id', OfferController.delete)
routes.put('/assign_project_team/:project_id', ProjectTeamAssignmentController.update);
routes.get('/ongoing_projects', OngoingProjectController.index);
routes.get('/ongoing_projects/:project_id', OngoingProjectController.show);
routes.put('/ongoing_projects/:project_id', OngoingProjectController.update);
routes.get('/project_messages/:project_id', ProjectMessageController.index);
routes.post('/project_messages/', ProjectMessageController.store);
routes.put('/project_approval_state/:project_id', ProjectStateController.update);
routes.delete('/project_approval_state/:project_id', ProjectStateController.delete);

module.exports = routes;