const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const authMiddleware = require('./controllers/authController');

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
const ProjectMessageController = require('./controllers/ProjectMessageController');
const ProjectStateController = require('./controllers/ProjectStateController');
const TeamJoiningSolicitationController = require('./controllers/TeamJoiningSolicitationController');
const TeamJoiningController = require('./controllers/TeamJoiningController');
const TeamMessageController = require('./controllers/TeamMessageController');
const TeamOwnerVerificationController = require('./controllers/TeamOwnerVerificationController');
const ProfileCommentController = require('./controllers/ProfileCommentController');
const TeamProfileCommentController = require('./controllers/TeamProfileCommentController');
const TeamMemberController = require('./controllers/TeamMemberController');
const UserGamificationStatusController = require('./controllers/UserGamificationStatusController');
const BonificationRedeemingController = require('./controllers/BonificationRedeemingController');

const routes = express.Router();
const upload = multer(uploadConfig);

// Public routes

routes.post('/bug_reports', BugReportController.store);
routes.post('/sessions', SessionController.create);
routes.post('/users', UserController.store);
routes.get('/', (request, response) => { return response.status(200).send() });

// Private routes

routes.use(authMiddleware);

routes.get('/users/:user_id', UserController.show);
routes.put('/users', upload.single('photo'), UserController.update);
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
routes.get('/profile_comments', ProfileCommentController.index);
routes.post('/profile_comments', ProfileCommentController.store);
routes.get('/team_profile_comments', TeamProfileCommentController.index);
routes.post('/team_profile_comments', TeamProfileCommentController.store);
routes.get('/team_members', TeamMemberController.index);
routes.get('/user_gamification_status', UserGamificationStatusController.show);
routes.put('/redeem_bonification', BonificationRedeemingController.update);

module.exports = routes;