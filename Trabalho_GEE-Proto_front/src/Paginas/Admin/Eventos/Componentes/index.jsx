import React, { useState } from 'react';
import Create from './Create';
import Read from './Read';
import Update from './Update';
import Delete from './Delete';
import SelectToUpdate from './SelectToUpdate';
import './index.css';

const Index = () => {
  const [action, setAction] = useState('Read');

  const renderComponent = () => {
    switch (action) {
      case 'Create':
        return <Create />;
      case 'Read':
        return <Read />;
      case 'Update':
        return <SelectToUpdate />;
      case 'Delete':
        return <Delete />;
      default:
        return <Read />;
    }
  };

  return (
    <div className="container">
      {/* Menu lateral */}
      <nav className="sidebar">
        {['Create', 'Read', 'Update', 'Delete'].map((item) => (
          <button
            key={item}
            onClick={() => setAction(item)}
            className={`menu-button ${action === item ? 'active' : ''}`}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Área principal */}
      <main className="main-content">
        {renderComponent()}
      </main>
    </div>
  );
};

export default Index;
