import { NavLink } from 'react-router-dom';
import { FiHome, FiList, FiMenu, FiLogOut } from 'react-icons/fi';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ toggleSidebar, isOpen }) => {
  return (
    <div
      className={`flex flex-col h-full bg-gray-900 text-gray-100 ${
        isOpen ? 'w-64' : 'w-20'
      } transition-all duration-300 fixed`}
    >
      {/* Sidebar Header */}
      <div className='flex justify-between items-center p-4'>
        <span
          className={`text-lg font-bold ${!isOpen && 'hidden'} transition-all`}
        >
          Admin Panel
        </span>
        <button onClick={toggleSidebar} className='text-xl'>
          <FiMenu />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className='mt-10 space-y-4 flex flex-col'>
        <NavLink
          to='/admin/dashboard'
          className={({ isActive }) =>
            `flex items-center gap-4 py-2 px-4 hover:bg-gray-700  ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <FiHome className='text-xl' />
          <span className={`${!isOpen && 'hidden'}`}>Dashboard</span>
        </NavLink>

        <NavLink
          to='/admin/data-list'
          className={({ isActive }) =>
            `flex items-center gap-4 py-2 px-4 hover:bg-gray-700  ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <FiList className='text-xl' />
          <span className={`${!isOpen && 'hidden'}`}>Data Gizi</span>
        </NavLink>

        <NavLink
          to='/'
          className={({ isActive }) =>
            `flex items-center gap-4 py-2 px-4 hover:bg-gray-700  relative top-96 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          <FiLogOut className='text-xl' />
          <span className={`${!isOpen && 'hidden'}`}>Logout</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
