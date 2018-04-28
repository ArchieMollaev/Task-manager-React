import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/Task';
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
  }

  componentWillReceiveProps({ user }) {
    if (user.error) {
      this.props.history.push('/');
    }
  }

  render = () => {
    const {
      deleteTask,
      editTask,
      switchStatus,
      user: {
        data: {
          Columns,
        },
      },
      addColumn,
    } = this.props;

    const { newListForm } = this.state;
    return (
      <div id="todo-app" >
        <h1>Task manager</h1>
        <div id="to-do-list-columns">
          <CardDragPreview />
          {Columns.map(({ name, Cards }) => (<Column
            columnName={name}
            key={name}
            className={name}
            colTitle={name}
            tasks={Cards}
            removeFunc={id => deleteTask({ status: name, id })}
            editFunc={data => editTask({ data, status: name })}
            switchFunc={objData => switchStatus(objData)}
          />))}
          <button
            type="button"
            className={classNames({ 'add-column': true, 'add-column-active': newListForm })}
            onClick={() => this.setState({ newListForm: true })}
          >
				  add list...
          </button>
          { newListForm &&
          <NewColumnForm
            closeFunc={() => this.setState({ newListForm: false })}
            onSubmit={(e) => { addColumn({ name: e.name.split(' ').join('_') }); this.setState({ newListForm: false }); }}
          />
				}
        </div>
      </div>
    );
  };
}

App.propTypes = {
  // columns: PropTypes.arrayOf(React.PropTypes.shape({
  //   color: React.PropTypes.string.isRequired,
  //   fontSize: React.PropTypes.number.isRequired,
  // })).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  switchStatus: PropTypes.func.isRequired,
  addColumn: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({ user });

class AppDndConnected extends DragDropContext(HTML5Backend)(App) {}

export default connect(mapStateToProps, actions)(AppDndConnected);
