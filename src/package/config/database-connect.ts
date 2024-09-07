import { connect, Request } from 'mssql';

var config = {
  user: 'OPC',
  password: 'OpcaBc@135#',
  server: '118.69.109.109',
  database: 'SAP_OPC',
  options: {
      trustServerCertificate: true,
      requestTimeout: 0
  },
};

// connect to your database
export const getSQLConnection = async () => {
  try {
    await connect(config);

    var request = new Request();

    const data = await request.execute('usp_KetQuaKinhDoanhCN_SAP_DashBoard');
    console.log(data);
  } catch (error: any) {
    console.log(error);
  }
};
