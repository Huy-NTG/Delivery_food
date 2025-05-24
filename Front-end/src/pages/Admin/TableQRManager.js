// Front-end/src/pages/Admin/TableQRManager.js
import React, { useState, useEffect } from 'react';
import TableQR from '../../components/TableQR/TableQR';
import './TableQRManager.module.scss';

function TableQRManager() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    // Giả sử bạn có 10 bàn
    setTables(Array.from({ length: 10 }, (_, i) => i + 1));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="table-qr-manager">
      <h1>Quản lý mã QR bàn</h1>
      <button onClick={handlePrint} className="print-button">
        In tất cả mã QR
      </button>
      <div className="tables-grid">
        {tables.map(tableId => (
          <div key={tableId} className="table-item">
            <TableQR tableId={tableId} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableQRManager;