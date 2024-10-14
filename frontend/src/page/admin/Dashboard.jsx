import Header from '../../components/AdminPageHeader';
import GiziBarChart from '../../components/GiziBarChart'; // Path to the BarChart component
import GiziMap from '../../components/GiziMap';
import GiziPieChart from '../../components/GiziPieChart'; // Path to the PieChart component

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-y-20 max-w-7xl mx-auto px-6'>
      <Header.DashboardHeader />

      <section className='bg-slate-200 p-6 flex justify-center'>
        <GiziMap />
      </section>

      <section className='bg-slate-200 p-6'>
        <h3 className='text-xl mb-5 font-bold text-center'>
          Jumlah Status Gizi Balita
        </h3>
        <GiziBarChart />
      </section>

      {/* Pie Chart */}
      <section className='bg-slate-200 p-6'>
        <h3 className='text-xl mb-5 font-bold text-center'>
          Persentase Gizi Kurang dan Buruk
        </h3>
        <GiziPieChart />
      </section>
    </div>
  );
};

export default Dashboard;
