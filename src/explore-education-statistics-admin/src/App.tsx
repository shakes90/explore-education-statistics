import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';

import AdminDashboardPage from './pages/prototypes/PrototypeAdminDashboard';
import AdminDocumentationGlossary from './pages/prototypes/PrototypeDocumentationGlossary';
import AdminDocumentationHome from './pages/prototypes/PrototypeDocumentationHome';

import PublicationCreateNew from './pages/prototypes/PrototypePublicationPageCreateNew';

import PublicationEditPage from './pages/prototypes/PrototypePublicationPageEditAbsence';
import PublicationCreateNewAbsence from './pages/prototypes/PrototypePublicationPageNewAbsence';
import PublicationCreateNewAbsenceConfig from './pages/prototypes/PrototypePublicationPageNewAbsenceConfig';
import PublicationCreateNewAbsenceConfigEdit from './pages/prototypes/PrototypePublicationPageNewAbsenceConfigEdit';
import PublicationCreateNewAbsenceData from './pages/prototypes/PrototypePublicationPageNewAbsenceData';
import PublicationCreateNewAbsenceSchedule from './pages/prototypes/PrototypePublicationPageNewAbsenceSchedule';
import PublicationCreateNewAbsenceScheduleEdit from './pages/prototypes/PrototypePublicationPageNewAbsenceScheduleEdit';
import PublicationCreateNewAbsenceStatus from './pages/prototypes/PrototypePublicationPageNewAbsenceStatus';
import PrototypesIndexPage from './pages/prototypes/PrototypesIndexPage';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={PrototypesIndexPage} />
      <Route exact path="/prototypes/" component={PrototypesIndexPage} />

      <Route
        exact
        path="/prototypes/admin-dashboard"
        component={AdminDashboardPage}
      />
      <Route
        exact
        path="/prototypes/publication-edit"
        component={PublicationEditPage}
      />
      <Route
        exact
        path="/prototypes/publication-create-new"
        component={PublicationCreateNew}
      />
      <Route
        exact
        path="/prototypes/publication-create-new-absence"
        component={PublicationCreateNewAbsence}
      />
      <Route
        exact
        path="/prototypes/publication-create-new-absence-config"
        component={PublicationCreateNewAbsenceConfig}
      />
      <Route
        exact
        path="/prototypes/publication-create-new-absence-config-edit"
        component={PublicationCreateNewAbsenceConfigEdit}
      />
      <Route
        exact
        path="/prototypes/publication-create-new-absence-data"
        component={PublicationCreateNewAbsenceData}
      />
      <Route
        exact
        path="/prototypes/publication-create-new-absence-schedule"
        component={PublicationCreateNewAbsenceSchedule}
      />
      <Route
        exact
        path="/prototypes/publication-create-new-absence-schedule-edit"
        component={PublicationCreateNewAbsenceScheduleEdit}
      />
      <Route
        exact
        path="/prototypes/publication-create-new-absence-status"
        component={PublicationCreateNewAbsenceStatus}
      />
      <Route
        exact
        path="/prototypes/documentation/"
        component={AdminDocumentationHome}
      />
      <Route
        exact
        path="/prototypes/documentation/glossary"
        component={AdminDocumentationGlossary}
      />
      <Route
        exact
        path="/prototypes/documentation/style-guide"
        component={AdminDocumentationGlossary}
      />
    </BrowserRouter>
  );
}

export default App;
