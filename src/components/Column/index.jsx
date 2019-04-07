import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import Card from 'components/Card';
import TaskCreator from 'components/TaskCreator';
import * as actions from 'actions/common';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import './style.scss';

const Types = {
  ITEM: 'card'
};

const targetSource = {
  drop(props, monitor) {
    const task = monitor.getItem();
    const newStatus = props.className;
    let position = props.hover.split('_')[0];
    if (task.currentStatus === newStatus && task.currentPosition < position) position -= 1;
    const sendData = {
      ...task,
      newStatus,
      position
    };
    props.switchFunc(sendData);
  }
};

const collect = (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver()
});

const replaceSpaces = target => target.split(' ').join('_');
class Column extends React.Component {
  state = {
    optionsStatus: false
  };

  getState = id => this.props.editable === id + this.props.className;

  remove = id => {
    this.props.setEditable();
    this.props.removeFunc(id);
  };

  formSubmit = (data, id) => {
    if (!data.taskName) {
      this.props.remove(id);
    } else {
      this.props.editFunc({ id, ...data });
      this.props.setEditable();
    }
  };

  edit = id => {
    this.props.setEditable(id + this.props.className);
    this.props.taskCreatorStatus();
  };

  showOptions = () =>
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
    );

  sortData = data => data.sort((a, b) => a.position - b.position);

  assignPostion = () =>
    this.props.tasks.length ? this.sortData(this.props.tasks).pop().position + 1 : '0';

  render = () => {
    const {
      editable,
      colTitle,
      colId,
      tasks,
      className,
      connectDropTarget,
      isOver,
      createCard,
      columnName,
      renameColumn,
      hover,
      hoverInjector
    } = this.props;

    return connectDropTarget(
      <div className={classNames({ 'task-column': true, 'drop-target': isOver })}>
        <input
          className="column-title"
          defaultValue={colTitle}
          onBlur={e => {
            renameColumn({
              currentName: replaceSpaces(colTitle),
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
        {this.showOptions()}
        <span className="badge">{tasks.length}</span>
        <ul>
          <div
            className={classNames({
              injector: true,
              'injector-active': hover === `${0}_injector` && isOver
            })}
            onDragOver={() => hoverInjector(`${0}_injector`)}
          />
          {this.sortData(tasks).map(({ id, title, description }, i) => (
            <div key={i}>
              <Card
                itemClass={classNames({ 'hover-item': hover === id && isOver })}
                status={className}
                editStatus={editable}
                dataID={id}
                position={i}
                title={title}
                description={description}
                classCard={classNames({ 'item-style': this.getState(id) })}
                classTitle={classNames({ title: true, hide: this.getState(id) })}
                classNote={classNames({ 'task-des': true, hide: this.getState(id) })}
                classRemove={classNames({ remove: true, 'remove-show': this.getState(id) })}
                classEdit={classNames({ edit: true, hide: this.getState(id) })}
                htmlFor={`${id}${title}`}
                classLabel={classNames({ show: description, hide: this.getState(id) })}
                checkerID={`${id}${title}`}
                removeFunc={() => this.remove(id)}
                editFunc={() => this.edit(id)}
                submitFunc={data => this.formSubmit(data, id)}
                canDrag={!this.getState(id)}
                injectorClass={classNames({
                  injector: true,
                  'injector-active': hover === `${i + 1}_injector` && isOver
                })}
                injectorHoverFunc={() => hoverInjector(`${i + 1}_injector`)}
              />
            </div>
          ))}
        </ul>
        <TaskCreator
          onSubmit={data => {
            reset('create-task');
            createCard({ ...data, ColumnId: colId, position: this.assignPostion() });
          }}
          column={columnName}
        />
      </div>
    );
  };
}

Column.propTypes = {
  editable: PropTypes.string.isRequired,
  setEditable: PropTypes.func.isRequired,
  remove: PropTypes.func,
  renameColumn: PropTypes.func.isRequired,
  taskCreatorStatus: PropTypes.func.isRequired,
  removeFunc: PropTypes.func.isRequired,
  editFunc: PropTypes.func.isRequired,
  colTitle: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  createCard: PropTypes.func.isRequired,
  columnName: PropTypes.string.isRequired,
  removeColumn: PropTypes.func.isRequired,
  hover: PropTypes.string.isRequired,
  hoverInjector: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  editable: state.editable,
  hover: state.hoverInjector
});

class ColumnDndConnected extends DropTarget(Types.ITEM, targetSource, collect)(Column) {}

export default connect(
  mapStateToProps,
  actions
)(ColumnDndConnected);
