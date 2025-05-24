import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TableQR({ tableId }) {
  const [qr, setQr] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/table/${tableId}/qr`)
      .then((res) => setQr(res.data.qr))
      .catch((err) => setQr(''));
  }, [tableId]);

  return (
    <div>
      <h2>Bàn số {tableId}</h2>
      {qr ? (
        <img src={qr} alt={`QR Code for Table ${tableId}`} style={{ width: 150, height: 150 }} />
      ) : (
        <p>Không thể tải mã QR</p>
      )}
      <p>Quét mã QR để xem menu và đặt món</p>
    </div>
  );
}

export default TableQR;