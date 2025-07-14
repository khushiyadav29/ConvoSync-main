import React, { useState } from 'react';
import API from '../../utils/api'; // Your axios instance

function UserSearch({ chatRoomId, onUserAdded }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 1) {
      const res = await API.get(`/api/users/search?q=${e.target.value}`);
      setResults(res.data);
    } else {
      setResults([]);
    }
  };

  const addToChat = async (userId) => {
    await API.post('/api/users/add-to-chat', {
      chatRoomId,
      userIdToAdd: userId,
    });
    if (onUserAdded) onUserAdded();
    alert('User added to chat!');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users by name"
        value={query}
        onChange={handleSearch}
      />
      <ul>
        {results.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email})
            <button onClick={() => addToChat(user._id)}>Add to Chat</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;