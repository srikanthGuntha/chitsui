# ChitsUI
## App
The app.module.ts is reponsible for bootstrapping the Angular application. Here we inject all of the dependent modules, services,
and components.

## Building and Running the Application

1. Install NPM (v3.10.10), Node (v6.10.3)
  * https://nodejs.org/en/download/
### Initial setup

Run `npm install` to install the web project's npm package dependencies.

### Build/Start Node Server

Run `npm start` or `ng serve` to build the project. This will Start the Node Server.

#### Routes

We also define the routes for the SPA here and their related components as follows:
* /Default User
* /home => HomeComponent
* /howitworks => WorksComponent
* /joinus => JoinComponent
* /groups => GroupsComponent
* /contactUs => ContactComponent
* /aboutUs => AboutComponent
* /login  => LoginComponent

* /User Module
* /user/howitwork => WorksComponent
* /user/group => GroupComponent
* /user/chits => UserChitsComponent
* /user/transactions => TransactionComponent
* /user/profile => ProfileComponent

* /Admin Module
* /admin/chits => AdminChitsComponent
* /admin/branches => AdminBranchesComponent
* /admin/chitids => AdminChitidsComponent
* /admin/userchits => UserChitsComponent

* /Agent Module
* /agent/chits => AgentChitsComponent
* /agent/users => AgentUsersComponent
* /agent/managechits => AgentManagementComponent

#### Test cases (Automation)
To Run automation test cases, please install protractor.js 
npm install -g protractor
webdriver-manager update
In root folder, run "protractor protractor.conf.js" command to see automated testing in chrome browser.

###### (notice a pattern...?)


