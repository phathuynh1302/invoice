import {
  CheckOutlined,
  ExceptionOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  CCard,
  CCardBody,
  CCardImage,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import React, { useContext, useState } from "react";
import ReactiveButton from "reactive-button";
import { AuthContext } from "../contexts/AuthContext";
import UserIcon from "../images/user.png";

const UserInformation = () => {
  const {
    authState: { user },
    setShowToast,
    logoutUser,
    updateProfile,
  } = useContext(AuthContext);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  //local state
  const [updateProfileForm, setUpdateProfileForm] = useState({
    username: user.userName,
    password: "",
    confirmPassword: "",
    email: user.email,
  });

  const { username, password, confirmPassword, email } = updateProfileForm;

  // const onClickHandler = (event) => {

  // };

  const onChangeUpdateProfileForm = (event) =>
    setUpdateProfileForm({
      ...updateProfileForm,
      [event.target.name]: event.target.value,
    });

  const update = async (event) => {
    if (confirmPassword !== password) {
      await setShowToast({
        show: true,
        message: "Password does not match",
        type: "error",
      });
      setUpdateProfileForm({
        ...updateProfileForm,
        password: "",
        confirmPassword: "",
      });
    } else {
      console.log(updateProfileForm);
      const updateForm = {
        userName: username,
        password: password,
        email: email,
      };

      const responseData = await updateProfile(updateForm);
      await logoutUser();
    }
  };

  return (
    <CContainer className={user.role === "ADMIN" ? "py-20" : "p-48"}>
      <CCard className="mb-3" style={{ borderRadius: ".5rem" }}>
        <CRow className="gap-0">
          <CCol
            md="4"
            className="gradient-custom text-center text-white rounded-t-lg rounded-b-lg"
          >
            <CCardImage
              src={UserIcon}
              alt="Avatar"
              className="my-5 m-auto w-72 h-72"
              fluid
            />
          </CCol>
          <CCol md="8">
            <h1 className="text-center pt-4 pb-4 font-extrabold text-blue-600 text-4xl">
              Profile Information
            </h1>{" "}
            <CCardBody className="py-2 px-6 ">
              <label for="checkbox" className=" mb-6">
                {componentDisabled === true && (
                  <h5 className="text-green-600 font-bold">
                    Tick to enable update profile
                  </h5>
                )}
                {componentDisabled === false && (
                  <h5 className="text-red-600 font-bold">
                    Tick to disable update profile
                  </h5>
                )}{" "}
              </label>
              <Checkbox
                className="pl-5"
                id="checkbox"
                checked={componentDisabled}
                onChange={(e) => {
                  setComponentDisabled(e.target.checked);
                  setUpdateProfileForm({
                    ...updateProfileForm,
                    password: "",
                    confirmPassword: "",
                  });
                }}
              ></Checkbox>

              <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 18,
                }}
                className="mb-4"
                layout="horizontal"
                onValuesChange={onFormLayoutChange}
                disabled={componentDisabled}
              >
                <Form.Item label="Username">
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    pattern="[A-Za-z][A-Za-z0-9_]{7,29}$"
                    title="Username should start with an alphabet, no special characters and length constraint was 8-30"
                    value={username}
                    className=" text-gray-800"
                    placeholder="Enter username"
                  />
                </Form.Item>

                {!componentDisabled && (
                  <Form.Item label="Password">
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}"
                      title="Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
                      value={password}
                      onChange={onChangeUpdateProfileForm}
                      className=" text-gray-800"
                      placeholder="Enter password"
                    />
                  </Form.Item>
                )}

                {!componentDisabled && (
                  <Form.Item label="Confirm Password">
                    <Input
                      id="confirmPassword"
                      type="password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}"
                      title="Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
                      onChange={onChangeUpdateProfileForm}
                      value={confirmPassword}
                      name="confirmPassword"
                      min={8}
                      className=" text-gray-800"
                      placeholder="Confirm your password"
                    />
                  </Form.Item>
                )}
                <Form.Item label="Email">
                  <Input
                    id="email"
                    type="text"
                    name="email"
                    pattern="[\w-\.]+@([\w-]+\.)+[\w-]{2,4}"
                    title="Invalid Email"
                    value={email}
                    onChange={onChangeUpdateProfileForm}
                    className=" text-gray-800"
                    placeholder="Enter email"
                  />
                </Form.Item>
                {!componentDisabled && (
                  <Row>
                    <Col xs={0} sm={4}></Col>
                    <Col xs={24} sm={18}>
                      <ReactiveButton
                        className="rounded-lg w-60 mb-2"
                        onClick={() => update()}
                        color={"primary"}
                        idleText={"Update"}
                        type={"button"}
                        style={{
                          borderRadius: "8px",
                        }}
                        width={150}
                        size={"normal"}
                        height={40}
                      />
                    </Col>
                  </Row>
                )}
              </Form>
            </CCardBody>
          </CCol>
        </CRow>
      </CCard>
    </CContainer>
  );
};

export default UserInformation;
