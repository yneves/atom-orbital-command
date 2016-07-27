'use babel';

import React, { PropTypes, Component } from 'react';
import Project from './Project';

export default class Projects extends Component {

  static propTypes = {
    projects: PropTypes.array.isRequired,
    selectedProjects: PropTypes.array.isRequired,
    selectedDirectories: PropTypes.array.isRequired,
    openTerminal: PropTypes.func.isRequired,
    toggleProject: PropTypes.func.isRequired,
    toggleDirectory: PropTypes.func.isRequired,
  };

  renderProject(project, index) {
    return (
      <Project
        key={index}
        selectedProject={this.props.selectedProjects.includes(project.id)}
        selectedDirectory={this.props.selectedDirectories.includes(project.dir)}
        openTerminal={this.props.openTerminal}
        toggleProject={this.props.toggleProject}
        toggleDirectory={this.props.toggleDirectory}
        {...project}
      />
    );
  }

  render() {
    return (
      <section>
        <header>
          Projects
        </header>
        <ul>
          {this.props.projects.map(this.renderProject, this)}
        </ul>
      </section>
    );
  }
};
