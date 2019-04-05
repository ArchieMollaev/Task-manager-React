import React from 'react';
import { connect } from 'react-redux';
import { deleteTask, editTask, switchStatus } from 'actions/Common-actions';
import { addColumn } from 'actions/Column-actions';
import Column from 'components/Column';
import CardDragPreview from 'components/DragLayer';
import NewColumnForm from 'components/Forms/app-forms/New-column-form';
import classNames from 'classnames';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import PropTypes from 'prop-types';
import './style.scss';

class App extends React.Component {
  state = {
    newListForm: false,
  };

  componentWillMount() {
    if (!localStorage.token) {
      this.props.history.push('/');
    }
  }

  render = () => {
    const {
      app: {
        data: { Columns },
      },
    } = this.props;

    const { newListForm } = this.state;
    return (
      <div id="todo-app">
        <div id="to-do-list-columns">
          <CardDragPreview />
          {Columns.map(({ id, name, Cards }) => (
            <Column
              columnName={name}
              colId={id}
              key={id}
              className={name}
              colTitle={name}
              tasks={Cards}
              removeFunc={id => {
                this.props.deleteTask({ status: name, id });
              }}
              editFunc={data => {
                this.props.editTask({ data, status: name });
              }}
              switchFunc={objData => {
                this.props.switchStatus(objData);
              }}
            />
          ))}
          <button
            type="button"
            className={classNames({ 'add-column': true, 'add-column-active': newListForm })}
            onClick={() => this.setState({ newListForm: true })}
          >
            add list...
          </button>
          {newListForm && (
            <NewColumnForm
              closeFunc={() => this.setState({ newListForm: false })}
              onSubmit={e => {
                this.props.addColumn({ name: e.name.split(' ').join('_') });
                this.setState({ newListForm: false });
              }}
            />
          )}
        </div>
      </div>
    );
  };
}

App.propTypes = {
  app: PropTypes.shape({
    data: React.PropTypes.shape({
      Columns: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          id: React.PropTypes.number,
          position: React.PropTypes.number,
          title: React.PropTypes.string,
          description: React.PropTypes.string,
        }),
      ),
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  switchStatus: PropTypes.func.isRequired,
  addColumn: PropTypes.func.isRequired,
};

class AppDndConnected extends DragDropContext(HTML5Backend)(App) {}

export default connect(
  ({ app }) => ({ app }),
  { deleteTask, editTask, switchStatus, addColumn },
)(AppDndConnected);
