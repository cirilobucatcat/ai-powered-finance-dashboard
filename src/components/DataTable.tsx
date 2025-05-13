import { DataTableColumn, DataTableProp } from '@/types';
import { formatToCurrency, formatToDate } from '@/utils/helpers';

const DataTable = <TData extends Record<string, any>>({
  columns,
  data,
  ...props
}: DataTableProp<TData>) => {
  const renderData = (column: DataTableColumn, row: TData) => {
    let formattedData = null;

    switch (column.format) {
      case 'currency':
        formattedData = formatToCurrency(parseInt(String(row[column.key])));
        break;
      case 'date':
        formattedData = row[column.key] ? formatToDate(row[column.key]) : 'Invalid date'
        break
      default:
        formattedData = row[column.key];
        break;
    }

    if (column.render) {
      return column.render(row);
    }

    return formattedData;
  };

  return (
    <table {...props} className='text-electric-lime my-10 bg-slate-950 rounded-lg'>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              align='center'
              key={column.key}
              className='py-4 text-base tracking-wide uppercase'
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className='odd:bg-slate-900 odd:hover:bg-slate-800/75 even:bg-slate-950 even:hover:bg-slate-900/75 transition-colors'
          >
            {columns.map((column) => (
              <td
                align={column.align}
                key={column.key}
                className='py-3 text-slate-50 text-sm'
              >
                {renderData(column, row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
