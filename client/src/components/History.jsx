import React, { useContext, useEffect, useState } from "react";
import { Table, Divider, Tag, Button } from "antd";
import { CContainer } from "@coreui/react";
import { DeleteFilled, DownloadOutlined } from "@ant-design/icons";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const History = () => {
  const { Column, ColumnGroup } = Table;
  const {
    authState: { isAuthenticated, user },
  } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getAllUser() {
      const response = await axios.get(
        `https://localhost:44327/api/Invoice/getInvoicebyIdUser=${user.id}`
      );
      const history = response.data.data;
      console.log(response);
      const newArray = history.map((item, index) => {
        return {
          key: index + 1,
          name: `${item.invoiceName} + ${item.serialNo}`,
          importedDate: `${item.importedDate.slice(
            0,
            10
          )} - ${item.importedDate.slice(11, 19)}`,
        };
      });
      console.log(newArray);
      setData(newArray);
    }
    getAllUser();
  }, []);

  return (
    <CContainer className="pt-32 px-28">
      <Table dataSource={data} pagination={{ pageSize: 8 }}>
        <Column className="text-center" title="No." dataIndex="key" key="key" />
        <Column
          className="text-center text-cyan-700"
          title="XML File"
          dataIndex="name"
          key="name"
        />
        <Column
          className="text-center"
          title="Import Date"
          dataIndex="importedDate"
          key="importedDate"
        />
      </Table>
    </CContainer>
  );
};

export default History;
