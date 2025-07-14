import React from 'react';
import UserSearch from '../UserSearch/UserSearch';

function AddUserToChat({ chatRoomId, onUserAdded }) {
  return (
    <div>
      <h3>Add User to Chat</h3>
      <UserSearch chatRoomId={chatRoomId} onUserAdded={onUserAdded} />
    </div>
  );
}

export default AddUserToChat;