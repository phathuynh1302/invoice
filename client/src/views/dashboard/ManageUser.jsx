import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import axios from "axios";

const ManageUser = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleClick = async (username, status) => {
    console.log(status);
    let a = status === "active" ? "Active" : "Disable";
    if (window.confirm(`Do you really want to ${a} this user`)) {
      const response = await axios.post(
        "https://localhost:44327/api/Authentication/updateAccount",
        { userName: username, status: status }
      );
      console.log(response);
      const res = await axios.get("https://localhost:44327/api/User/getUsers");
      const users = res.data.data.map((item, index) => ({
        ...item,
        key: index + 1,
        createdDay: item.createdDay.slice(0, 10),
      }));
      setData(users);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      width: "10%",
    },
    {
      title: "Username",
      dataIndex: "userName",
      ...getColumnSearchProps("userName"),
      width: "30%",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
      width: "40%",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Created Date",
      dataIndex: "createdDay",
      width: "20%",
      key: "createdDay",
      sorter: (a, b) => new Date(a.createdDay) - new Date(b.createdDay),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "active" ? (
          <Button
            type="primary"
            danger
            style={{ background: "lime", width: "100%", fontWeight: "800" }}
            onClick={() => handleClick(record.userName, "disable")}
          >
            Active
          </Button>
        ) : (
          <Button
            type="primary"
            style={{ backgroundColor: "red", width: "100%", fontWeight: "800" }}
            onClick={() => handleClick(record.userName, "active")}
          >
            Disabled
          </Button>
        ),
      width: "20%",
    },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getAllUser() {
      const response = await axios.get(
        "https://localhost:44327/api/User/getUsers"
      );
      const users = response.data.data.map((item, index) => ({
        ...item,
        key: index + 1,
        createdDay: item.createdDay.slice(0, 10),
      }));
      setData(users);
    }
    getAllUser();
  }, []);

  const onChange = (pagination, filters, sorter) => {
    console.log("params", pagination, filters, sorter);
  };
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={{ pageSize: 9 }}
    />
  );
};
export default ManageUser;
