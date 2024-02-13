interface TableCellProps {
  children: React.ReactNode;
}

const TableCell = ({ children }: TableCellProps) => {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      {children}
    </td>
  );
};

export default TableCell;
