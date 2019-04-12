import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { sortBy, get } from 'lodash';
import Card from 'components/Card';
import TaskCreator from 'components/TaskCreator';
import * as actions from 'actions/common';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';
import './style.scss';
import { combineActions } from '../../utils/redux-utils';

const Types = {
  ITEM: 'card'
};

const targetSource = {
  drop(props, monitor) {
    const task = monitor.getItem();
    const position = props.activeInjectorId;

    props.editTask({
      ...task,
      ColumnId: props.columnId,
      position
    });
  }
};

const collect = (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver()
});

const replaceSpaces = target => target.split(' ').join('_');

class Column extends React.Component {
  state = {
    optionsStatus: false,
    initialInjectorId: Date.now()
  };

  get sortedTasks() {
    return sortBy(this.props.tasks, ['position']);
  }

  getState = id => this.props.editable === id + this.props.className;

  // remove = id => {
  //   this.props.setEditable();
  //   this.props.removeFunc({ id });
  // };

  // formSubmit = (data, id) => {
  //   if (!data.taskName) {
  //     this.props.remove({ id });
  //   } else {
  //     this.props.editFunc({ id, ...data });
  //     this.props.setEditable();
  //   }
  // };

  // edit = id => {
  //   this.props.setEditable({ id: id + this.props.className });
  //   this.props.taskCreatorStatus();
  // };

  get showOptions() {
    return (
      this.state.optionsStatus && (
        <ul className="options-menu">
          <li>
            options
            <button type="button" onClick={() => this.setState({ optionsStatus: false })}>
              х
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => this.props.removeColumn({ name: replaceSpaces(this.props.colTitle) })}
            >
              delete list
            </button>
          </li>
        </ul>
      )
    );
  }

  getInjectorId = (itemPos1, itemPos2) => {
    return itemPos2 ? Math.floor((+itemPos1 + +itemPos2) / 2) : itemPos1 + 323;
  };

  getInjector = id => {
    return (
      <li>
        <div
          className={classNames({
            injector: true,
            'injector-active': this.props.activeInjectorId === id && this.props.isOver
          })}
          onDragOver={() => {
            if (this.props.activeInjectorId !== id) {
              this.props.hoverInjector({
                id
              });
            }
          }}
        />
      </li>
    );
  };

  get columnTitle() {
    return (
      <div>
        <input
          className="column-title"
          defaultValue={this.props.colTitle}
          onBlur={e => {
            this.props.renameColumn({
              currentName: replaceSpaces(this.props.colTitle),
              newName: replaceSpaces(e.target.value)
            });
          }}
        />
        <button
          type="button"
          className="options"
          onClick={() => this.setState({ optionsStatus: true })}
        >
          ...
        </button>
        <span className="badge">{this.sortedTasks.length}</span>
      </div>
    );
  }

  render = () => {
    const { columnId, connectDropTarget, isOver, addTask } = this.props;

    const initialInjectorId = this.sortedTasks[0]
      ? this.sortedTasks[0].position - 323
      : this.state.initialInjectorId;

    return connectDropTarget(
      <div className={classNames({ 'task-column': true, 'drop-target': isOver })}>
        {this.columnTitle}
        {this.showOptions}
        <ul>
          {this.getInjector(initialInjectorId)}
          {this.sortedTasks.map(({ id, title, description, position }, i, arr) => (
            <div>
              <Card id={id} position={position} title={title} description={description} />
              {this.getInjector(this.getInjectorId(position, get(arr[i + 1], 'position')))}
            </div>
          ))}
        </ul>
        <TaskCreator
          onSubmit={data => {
            reset('create-task');
            addTask({ ...data, columnId, position: Date.now() });
          }}
          columnId={columnId}
        />
      </div>
    );
  };
}

const mapStateToProps = state => ({
  editable: state.editable,
  activeInjectorId: state.activeInjectorId
});

class ColumnDndConnected extends DropTarget(Types.ITEM, targetSource, collect)(Column) {}

export default connect(
  mapStateToProps,
  combineActions(actions)
)(ColumnDndConnected);
