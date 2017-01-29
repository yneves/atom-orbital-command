'use babel';

import React, { PropTypes, Component } from 'react';
import R from 'ramda';
import autoBind from 'class-autobind';
import Project from './Project';

export default class Projects extends Component {

  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    section: PropTypes.string.isRequired,
    projects: PropTypes.array.isRequired,
    repositories: PropTypes.array.isRequired,
    selectedProjects: PropTypes.array.isRequired,
    selectedDirectories: PropTypes.array.isRequired,
    openTerminal: PropTypes.func.isRequired,
    toggleProject: PropTypes.func.isRequired,
    toggleDirectory: PropTypes.func.isRequired,
    terminalActive: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderProject(project, index) {
    const findByDir = R.find(R.propEq('dir', project.dir));
    const repositoryActive = !!findByDir(this.props.repositories);
    return (
      <Project
        key={index}
        repositoryActive={repositoryActive}
        selectedProject={this.props.selectedProjects.includes(project.id)}
        selectedDirectory={this.props.selectedDirectories.includes(project.dir)}
        openTerminal={this.props.openTerminal}
        toggleProject={this.props.toggleProject}
        toggleDirectory={this.props.toggleDirectory}
        terminalActive={this.props.terminalActive}
        {...project}
      />
    );
  }

  filterCollapsed(project) {
    return !this.props.collapsed ||
      this.props.selectedProjects.includes(project.id);
  }

  onClickHeader() {
    this.props.toggleSection(this.props.section);
  }

  render() {
    return (
      <section>
        <header onClick={this.onClickHeader}>
          Projects
        </header>
        <ul>
          {this.props.projects
            .filter(this.filterCollapsed)
            .map(this.renderProject, this)}
        </ul>
      </section>
    );
  }
}
