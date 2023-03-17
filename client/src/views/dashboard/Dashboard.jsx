import React, { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgressBar,
  CRow,
} from "@coreui/react";
import avatar from "../../images/user.png";
import { Line } from "@ant-design/charts";

import { Button, Col, Input, notification, Row, Space, Table } from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { cilPeople } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const searchInput = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);

  const [api, contextHolder] = notification.useNotification();
  const [allUser, setAllUser] = useState([]);
  const [history, setHistory] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    async function getAllUser() {
      const response = await axios.get(
        "https://localhost:44327/api/User/getUsers"
      );
      const users = response.data.data.map((item, index) => ({
        ...item,
        createdDay: item.createdDay.slice(0, 10),
      }));
      setAllUser(users);

      const res = await axios.get(
        "https://localhost:44327/api/Invoice/getInvoices"
      );
      const histories = res.data.data.map((item, index) => ({
        ...item,
        importedDate: item.importedDate.slice(0, 10),
      }));
      setHistory(histories);
      const r = await axios.get(
        "https://localhost:44327/api/User/getAllFeedBack"
      );

      const feedbacks = r.data.data
        .sort((a, b) => {
          const dateA = new Date(a.dateCommnet);
          const dateB = new Date(b.dateCommnet);
          return dateB - dateA;
        })
        .map((item) => ({
          avatar: { src: avatar, status: "success" },
          username: item.username,
          message: item.commnent,
          // activity: new Date(item.dateCommnet).toLocaleString(),
          activity:
            Math.floor((new Date() - new Date(item.dateCommnet)) / 1000) < 60
              ? `${Math.floor(
                  (new Date() - new Date(item.dateCommnet)) / 1000
                )} seconds ago`
              : Math.floor((new Date() - new Date(item.dateCommnet)) / 1000) <
                3600
              ? `${Math.floor(
                  (new Date() - new Date(item.dateCommnet)) / (1000 * 60)
                )} minutes ago`
              : Math.floor((new Date() - new Date(item.dateCommnet)) / 1000) <
                86400
              ? `${Math.floor(
                  (new Date() - new Date(item.dateCommnet)) / (1000 * 60 * 60)
                )} hours ago`
              : `${Math.floor(
                  (new Date() - new Date(item.dateCommnet)) /
                    (1000 * 60 * 60 * 24)
                )} days ago`,
        }));
      setFeedback(feedbacks);
      const usageByDate = histories.reduce((acc, item) => {
        const { importedDate } = item;
        acc[importedDate] = acc[importedDate] ? acc[importedDate] + 1 : 1;
        return acc;
      }, {});
      const usageChartData = Object.entries(usageByDate).map(
        ([year, value]) => ({
          year,
          value,
          category: "Usage",
        })
      );
      setData(usageChartData);
    }
    getAllUser();
  }, []);
  const {
    showToast: { show, message, type },
    setShowToast,
  } = useContext(AuthContext);
  useEffect(() => {
    if (show) {
      api[type]({
        message: message,
        placement: "bottomRight",
      });
      setShowToast({ show: false, message: "", type: null });
    }
  }, [show]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters, confirm, dataIndex) => {
    clearFilters();
    confirm();
    setSearchText("");
    setSearchedColumn(dataIndex);
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
            className="bg-gray-400"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={
              <SearchOutlined
                className="text-gray-100"
                style={{ verticalAlign: "0em" }}
              />
            }
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              clearFilters && handleReset(clearFilters, confirm, dataIndex)
            }
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
              close();
            }}
          >
            <CloseCircleFilled style={{ verticalAlign: "0em" }} />
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
  const config = {
    data,
    xField: "year",
    yField: "value",
    seriesField: "category",

    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    legend: {
      position: "top",
    },

    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };
  const downloadImage = () => {
    chart?.downloadImage();
  };
  const columns = [
    {
      title: <CIcon icon={cilPeople} />,
      dataIndex: "avatar",
      width: "10%",
      render: (image) => (
        <CAvatar size="md" src={image.src} status={image.status} />
      ),
    },
    {
      title: "User",
      dataIndex: "username",
      width: "20%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Message",
      dataIndex: "message",
      width: "40%",
    },
    {
      title: "Activity",
      dataIndex: "activity",
      width: "20%",
      key: "activity",
    },
  ];
  const progressExample = [
    {
      title: "All Users",
      value: allUser.length,
      percent: 40,
      color: "success",
    },
    {
      title: "New Users",
      value: allUser.filter(
        (user) => user.createdDay === new Date().toISOString().slice(0, 10)
      ).length,
      percent: (
        (allUser.filter(
          (user) => user.createdDay === new Date().toISOString().slice(0, 10)
        ).length /
          allUser.length) *
        100
      ).toFixed(2),
      color: "danger",
    },
    {
      title: "Usage",
      value: history.length,
      percent: 20,
      color: "info",
    },
    {
      title: "Usage Today",
      value: history.filter(
        (item) => item.importedDate === new Date().toISOString().slice(0, 10)
      ).length,
      percent: (
        (history.filter(
          (item) => item.importedDate === new Date().toISOString().slice(0, 10)
        ).length *
          100) /
        history.length
      ).toFixed(2),
      color: "info",
    },
    {
      title: "Feedback",
      value: feedback.length,
      color: "warning",
    },
    {
      title: "New Feedback",
      value: feedback.filter((item) => {
        const activityDate = new Date();
        const timeUnits = {
          minutes: 60000,
          hours: 3600000,
          days: 86400000,
          seconds: 1000,
        };

        const [amount, unit] = item.activity.split(" ");
        const millisecondsAgo = amount * timeUnits[unit];

        activityDate.setTime(Date.now() - millisecondsAgo);

        return activityDate >= new Date(Date.now() - timeUnits["days"]);
      }).length,
      percent: (
        (feedback.filter((item) => {
          const activityDate = new Date();
          const timeUnits = {
            minutes: 60000,
            hours: 3600000,
            days: 86400000,
            seconds: 1000,
          };

          const [amount, unit] = item.activity.split(" ");
          const millisecondsAgo = amount * timeUnits[unit];

          activityDate.setTime(Date.now() - millisecondsAgo);

          return activityDate >= new Date(Date.now() - timeUnits["days"]);
        }).length *
          100) /
        feedback.length
      ).toFixed(2),
      color: "warning",
    },
  ];

  return (
    <>
      <CCard className="mb-4">
        {contextHolder}
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 6 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value}
                  {item.title !== "Feedback" &&
                    item.title !== "All Users" &&
                    item.title !== "Usage" && <> ({item.percent}%)</>}
                </strong>

                <CProgressBar
                  thin
                  className="mt-2"
                  color={item.color}
                  value={item.percent}
                />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            {/* <CCardHeader>Usage </CCardHeader> */}
            <CCardBody>
              <Row>
                <Col span={24}>
                  <Line {...config} />
                </Col>
              </Row>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs>
          <CCard>
            <CCardBody>
              <Table
                columns={columns}
                dataSource={feedback}
                pagination={{ pageSize: 10 }}
              />
            </CCardBody>
          </CCard>{" "}
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
