"use client";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Detail() {
  const router = useRouter();
  const { id: urlInfo } = useParams();
  const [type, id] = urlInfo || [];
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (id && type == "edit") {
      getData(id);
    }
  }, [id]);

  function getData(id: string) {
    axios.get("/api/articles/" + id).then((res) => {
      if (res?.data?.data) {
        form.setFieldsValue(res?.data?.data);
      } else {
        form.resetFields();
      }
    });
  }

  const onCancel = () => {
    router.push("/table/list");
  };

  const submit = () => {
    form.validateFields().then((values: { title: string; content: string }) => {
      if (values) {
        if (type === "add") {
          setLoading(true);
          axios
            .post("/api/articles", values)
            .then((res) => {
              if (res?.data?.code === 0) {
                onCancel();
              }
            })
            .finally(() => {
              setLoading(false);
            });
        } else if (type === "edit" && id) {
          setLoading(true);
          axios
            .patch("/api/articles/" + id, values)
            .then((res) => {
              if (res?.data?.code === 0) {
                onCancel();
              }
            })
            .finally(() => {
              setLoading(false);
            });
        }
      }
    });
  };

  return (
    <div className="p-2">
      <div className="h-[50px] w-[100px] mb-[20px] leading-[50px] text-[#1677ff] cursor-pointer select-none" onClick={onCancel}>
        <LeftOutlined />
        {type === "add" ? "新增" : "编辑"}
      </div>
      <div className="flex justify-center ">
        <Form
          className="flex gap-4 w-[1000px] justify-center items-center flex-col flex-wrap"
          form={form}
          labelCol={{ span: 5 }}
          layout="inline"
          wrapperCol={{ span: 19 }}
        >
          <Form.Item name="title" label="title" className="w-[500px]" rules={[{ required: true, message: "请输入title" }]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item name="content" label="content" className="w-[500px] mb-[30px]" rules={[{ required: true, message: "请输入content" }]}>
            <Input.TextArea maxLength={100} showCount placeholder="请输入" />
          </Form.Item>
          <Form.Item className="w-[500px] text-center " wrapperCol={{ span: 24 }}>
            <Button type="primary" onClick={onCancel}>
              取消
            </Button>
            <Button type="primary" htmlType="button" className="ml-4" onClick={submit} loading={loading} disabled={loading}>
              确定
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
