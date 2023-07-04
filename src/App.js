import './App.css';
import {
  CreateNote,
  NavBar,
  NoteUICollection,
  UpdateNote,
} from './ui-components';
import { useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
// Allows us to clear out local data for two users using same machine
import { DataStore } from 'aws-amplify';

function App({ signOut }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateNote, setUpdateNote] = useState();

  return (
    <>
      <NavBar
        width='100%'
        marginBottom='20px'
        overrides={{
          Button31632483: { onClick: () => setShowCreateModal(true) },
          Button31632487: {
            onClick: async () => {
              await DataStore.clear();
              signOut();
            },
          },
        }}
      />
      <div className='container'>
        <NoteUICollection
          overrideItems={({ item, idx }) => {
            return {
              overrides: {
                Vector31472745: {
                  // as: 'button',
                  onClick: () => {
                    setShowUpdateModal(true);
                    setUpdateNote(item);
                  },
                },
              },
            };
          }}
        />
      </div>
      <div
        className='modal'
        style={{ display: showCreateModal === false && 'none' }}
      >
        <CreateNote
          overrides={{
            MyIcon: {
              as: 'button',
              onClick: () => setShowCreateModal(false),
            },
          }}
        />
      </div>
      <div
        className='modal'
        style={{ display: showUpdateModal === false && 'none' }}
      >
        <UpdateNote
          note={updateNote}
          overrides={{
            MyIcon: {
              as: 'button',
              onClick: () => setShowUpdateModal(false),
            },
          }}
        />
      </div>
    </>
  );
}

export default withAuthenticator(App);
