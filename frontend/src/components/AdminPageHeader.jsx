const DashboardHeader = () => {
  return (
    <div className='bg-blue-700 text-white py-6 px-8 rounded-lg shadow-md'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        {/* Title Section */}
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold mb-2'>Dashboard Laporan Gizi</h1>
          <p className='text-lg'>Kabupaten Sumenep</p>
        </div>

        {/* Info Section */}
        <div className='flex space-x-4 items-center'>
          <div className='bg-blue-600 px-4 py-2 rounded-md shadow-md'>
            <span className='text-sm'>Total Balita Diperiksa</span>
            <h3 className='font-semibold text-xl'>9,876</h3>
          </div>
          <div className='bg-green-600 px-4 py-2 rounded-md shadow-md'>
            <span className='text-sm'>Stunting</span>
            <h3 className='font-semibold text-xl'>320</h3>
          </div>
          <div className='bg-red-600 px-4 py-2 rounded-md shadow-md'>
            <span className='text-sm'>Gizi Buruk</span>
            <h3 className='font-semibold text-xl'>25</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataListHeader = () => {
  return (
    <div className='bg-indigo-600 text-white py-6 px-8 rounded-lg shadow-md'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        {/* Title Section */}
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold mb-2'>Daftar Data</h1>
          <p className='text-lg'>
            Halaman untuk melihat dan mengelola data yang telah terdaftar.
          </p>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Header = ({ chidlren }) => {
  return <>{chidlren}</>;
};

export default Header;

Header.DataListHeader = DataListHeader;
Header.DashboardHeader = DashboardHeader;
