/* eslint-disable react/prop-types */
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Button from './Button';

const balita_underweight = [
  {
    id: 1,
    kecamatan: 'Rubaru',
    puskesmas: 'Rubaru',
    jumlah_balita_ditimbang: '340',
    jumalah: '300',
    persen: '300',
  },
  {
    id: 2,
    kecamatan: 'Bluto',
    puskesmas: 'Bluto',
    jumlah_balita_ditimbang: '740',
    jumalah: '290',
    persen: '300',
  },
  {
    id: 3,
    kecamatan: 'Parenduan',
    puskesmas: 'Parenduan',
    jumlah_balita_ditimbang: '940',
    jumalah: '690',
    persen: '300',
  },
];

const columns = [
  { header: 'ID', accessorKey: 'id' },
  { header: 'Kecamatan', accessorKey: 'kecamatan' },
  { header: 'Puskesmas', accessorKey: 'puskesmas' },
  { header: 'Jumlah Balita Ditimbang', accessorKey: 'jumlah_balita_ditimbang' },
  {
    header: 'Jumlah',
    accessorKey: 'Jumlah',
  },
  {
    header: 'Persen',
    accessorKey: 'Persen',
  },
];

const TabelGizi = () => {
  const table = useReactTable({
    data: balita_underweight,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='container border border-gray-300'>
      <div className='flex w-full justify-between pb-5 flex-row-reverse px-4 py-5'>
        <Button.ButtonPrimary>Tambah data</Button.ButtonPrimary>
        <h1 className='font-bold text-xl'>
          Tabel Gizi Balita di Kabupaten Sumenep
        </h1>
        <Button.ButtonSuccess>
          Ekspor data
        </Button.ButtonSuccess>
      </div>

      <table className='min-w-full table-auto border-collapse overflow-x-auto'>
        <thead className='bg-gray-100'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='border'>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='px-4 py-2 text-left text-sm font-medium text-gray-900 border border-gray-200'
                >
                  {header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className='hover:bg-gray-50'>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className='px-4 py-2 text-sm text-gray-700 border border-gray-200'
                >
                  {cell.renderValue()}
                </td>
              ))}
            </tr>
          ))}
          <tr className='font-bold text-gray-900 bg-gray-200'>
            <td colSpan={3} className='px-4 py-2'>
              Total
            </td>
            <td className='px-4 py-2 border border-gray-200'>39999</td>
            <td className='px-4 py-2 border border-gray-00'>39999</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TabelGizi;
