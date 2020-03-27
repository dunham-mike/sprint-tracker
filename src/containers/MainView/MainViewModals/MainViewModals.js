import React from 'react';

import ModalErrorBoundary from '../../ErrorBoundary/ModalErrorBoundary/ModalErrorBoundary';
import EditProject from '../../EditProject/EditProject';
import EditSprint from '../../EditSprint/EditSprint';
import SprintStatistics from '../../../components/SprintStatistics/SprintStatistics';
  
const mainViewModals = (props) => {

    let projectEditModal = null;
    if (props.editingProject) {
        projectEditModal = (
            <div>
                <ModalErrorBoundary
                    onClose={props.closeEditingProject}
                >
                    <EditProject 
                        projectId={props.projectIdBeingViewed}
                        sprintId={props.sprintIdBeingViewed}
                        sprintIndex={props.sprintIndexBeingViewed}
                        onCloseProject={props.closeEditingProject}
                        actionType={"edit"}
                    />
                </ModalErrorBoundary>
            </div>
        );
    }

    let projectCreateModal = null;
    if (props.creatingProject) {
        projectCreateModal = (
            <div>
                <ModalErrorBoundary
                    onClose={props.closeCreatingProject}
                >
                    <EditProject 
                        projectId={null}
                        sprintId={props.sprintIdBeingViewed}
                        sprintIndex={props.sprintIndexBeingViewed}
                        onCloseProject={props.closeCreatingProject}
                        actionType={"create"}
                    />
                </ModalErrorBoundary>
            </div>
        );
    }

    let sprintEditModal = null;
    if (props.editingSprint) {
        sprintEditModal = (
            <div>
                <ModalErrorBoundary
                    onClose={props.closeEditingSprint}
                >
                    <EditSprint
                        sprintId={props.sprintIdBeingViewed}
                        onCloseSprint={props.closeEditingSprint}
                        actionType={"edit"}
                    />
                 </ModalErrorBoundary>
            </div>
        );
    }

    let sprintCreateModal = null;
    if (props.creatingSprint) {
        sprintCreateModal = (
            <div>
                <ModalErrorBoundary
                    onClose={props.closeCreatingSprint}
                >
                    <EditSprint
                        onCloseSprint={props.closeCreatingSprint}
                        actionType={"create"}
                    />
                 </ModalErrorBoundary>
            </div>
        );
    }

    let sprintStatisticsModal = null;
    if (props.displayingSprintStatistics) {
        sprintStatisticsModal = (
            <div>
                <ModalErrorBoundary
                    onClose={props.closeSprintStatistics}
                >
                    <SprintStatistics 
                        sprintId={props.sprintIdBeingViewed}
                        sprintIndex={props.sprintIndexBeingViewed}
                        onCloseSprintStatistics={props.closeSprintStatistics}
                    />
                </ModalErrorBoundary>
            </div>
        );
    }

    return(
        <React.Fragment>
            {projectEditModal}
            {projectCreateModal}

            {sprintEditModal}
            {sprintCreateModal}

            {sprintStatisticsModal}
        </React.Fragment>
    );
}

export default mainViewModals;