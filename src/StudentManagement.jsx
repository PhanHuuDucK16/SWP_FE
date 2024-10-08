import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Table,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import { uploadFile } from "./utils/file";
//npm i react-toastify
//npm install firebase
//npm install react-router-dom
function StudentManagement() {
  //quan li sinh vien
  //1. xem dssv
  //2. them 1 sv moi
  //3. update thong tin cho sinh vien
  //4. xoa 1 thang sinh vien nap do

  const [students, setStudents] = useState([]);
  const [openModel, setOpenModal] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [form] = useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const api = "https://670018964da5bd2375532c5e.mockapi.io/Student";
  //await thi function nay phai la async
  const fetchStudent = async () => {
    //lay du lieu ve backend
    //promise => function bat dong bo => can thoi gian de thuc hien
    // await: doi toi khi ma api tra ve ket qua
    const response = await axios.get(api);

    console.log(response.data); //xem thang backend tra ve du lieu gi
    setStudents(response.data);
    // GET => lay du lieu
  };

  //[]: dependency array
  useEffect(() => {
    //hanh dong
    //chay mot cai hanh dong gi do
    //event
    //khai bao[] => chay khi load trang lan dau
    // [number] => chay moi khi ma number thay doi
    fetchStudent();
  }, []);
  const columns = [
    {
      title: "ID", //ten cua cot
      dataIndex: "id", //ten bien ma backend tra ve
      key: "id", //ten bien ma backend tra ve
    },
    {
      title: "Image", //ten cua cot
      dataIndex: "image", //ten bien ma backend tra ve
      key: "image", //ten bien ma backend tra ve
      render: (image) => {
        return <Image src={image} alt="" width={200} />;
      }, //minh se return lai cai anh chu khong phai cai link storage nua
      //co the su dung 1 trong 2: img hoac Image cua antdesign se co them preview
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      //muon ko hien gia tri mac dinh thi xai render
      render: (id) => {
        return (
          <>
            <Popconfirm
              title="Delete"
              description="Do you want to delete this student?"
              onConfirm={() => handleDeleteStudent(id)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const handleOpenModel = () => {
    //tac dong vao cai bien open model
    setOpenModal(true);
  };
  const handleCloseModel = () => {
    //phai dong model moi tat dc
    setOpenModal(false);
  };
  const handleSubmitStudent = async (student) => {
    if (fileList.length > 0) {
      const file = fileList[0]; // Changed from FileList to fileList
      console.log(file);
      const url = await uploadFile(file.originFileObj);
      console.log(url);
      // Add the image URL to the student object
      student.image = url;
    }

    console.log(student);

    try {
      //quang data xuong cho backend
      setSubmitting(true);
      const response = await axios.post(api, student);
      toast.success("Successfully create new student");
      handleCloseModel();
      form.resetFields();
      setFileList([]); // Clear the fileList after successful submission
      fetchStudent();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`${api}/${studentId}`);
      toast.success("Deleted Successfully!");
      fetchStudent();
    } catch (error) {
      toast.error("Fail to delete Student!");
    }
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const handleOnOk = () => {
    form.submit();
  };
  //tai thu vien de lay du lieu tu backend ve npm i axios
  return (
    <div>
      <h1>StudentManagement</h1>
      <button onClick={handleOpenModel}>Create a new student</button>
      <Table
        columns={columns}
        dataSource={students}
        rowKey="id" // Add this line
      />
      <Modal
        confirmLoading={submitting}
        onOk={handleOnOk}
        title="Create a new student"
        open={openModel}
        onCancel={handleCloseModel}
      >
        {/* form: dai dien cho cai form nay */}
        <Form onFinish={handleSubmitStudent} form={form}>
          {/* name: ten bien lay tu backend ve */}
          {/* rule: dinh nghia validation */}
          <Form.Item
            label="Student name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input student's name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Student code"
            name="code"
            rules={[
              {
                required: true,
                message: "Please input student's code",
              },
              {
                pattern: "^SE\\d{6}$",
                message: "Invalid format!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Student score"
            name="score"
            rules={[
              {
                required: true,
                message: "Please input student's score!",
              },
              {
                type: "number",
                min: 0,
                max: 10,
                message: "Invalid score!",
              },
            ]}
          >
            <InputNumber step={0.5} />
          </Form.Item>

          <Form.Item label="image" name="image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false} // Prevent default upload
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
    //phai tai thu vien cua antd truoc sau do moi co the xai cai component nay. npm i antd
  );
}

export default StudentManagement;
