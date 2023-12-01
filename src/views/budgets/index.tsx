import React, { useState } from 'react';
import ProjectList from 'views/budgets/ProjectList';
import ProjectDetails from './ProjectDetails';

interface OpenProject {
    open: boolean; // Whether a project is open or not
    id?: number; // Project ID
    details: any; // Details of the open project (You can replace 'any' with a specific type if available)
}

const Budgets = () => {
    const [openProject, setOpenProject] = useState<OpenProject>({
        open: false,
        details: {},
        id: 0
    });
    return (
        <React.Fragment>
            <ProjectList setProject={setOpenProject} project={openProject} />
            <ProjectDetails project={openProject} setProject={setOpenProject} />
        </React.Fragment>
    );
};

export default Budgets;
