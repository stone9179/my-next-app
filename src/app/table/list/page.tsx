"use client";
import { Button, Form, Input, Space, Table } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function List() {
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [tableLoading, setTableLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total}条`,
  });
  const [paramObj, setParamObj] = useState({});
  const router = useRouter();

  useEffect(getData, [paramObj, pagination.current, pagination.pageSize]);

  function getData() {
    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...paramObj,
    };
    setTableLoading(true);
    axios
      .get("/api/articles", { params })
      .then((res) => {
        if (res?.data?.data?.list) {
          setDataSource(res?.data?.data?.list);
          setPagination((prev) => ({ ...prev, total: res?.data?.data?.total || 0 }));
        } else {
          setDataSource([]);
          setPagination((prev) => ({ ...prev, total: 0 }));
        }
      })
      .finally(() => {
        setTableLoading(false);
      });
  }

  const columns = [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "title", dataIndex: "title", key: "title" },
    { title: "content", dataIndex: "content", key: "content" },
    {
      title: "Action",
      key: "Action",
      render: (_: string, record: { id: string }) => (
        <Space size="middle">
          <a onClick={() => edit(record.id)}>编辑</a>
          <a onClick={() => del(record.id)}>删除</a>
        </Space>
      ),
    },
  ];
  const onAdd = () => {
    router.push("/table/add");
  };

  function edit(id: string) {
    router.push(`/table/edit/${id}`);
  }

  function del(id: string) {
    axios.delete("/api/articles/" + id).then((res) => {
      if (res?.data?.code === 0) {
        getData();
      }
    });
  }

  const onSearch = () => {
    form.validateFields().then((values) => {
      if (values) setParamObj(values);
    });
  };

  const onReset = () => {
    setParamObj({ id: "", title: "", content: "" });
    form.setFieldsValue(paramObj);
  };

  const onChange = (page: { current?: unknown; pageSize?: unknown }) => {
    if (page?.current) {
      setPagination((prev) => ({ ...prev, current: Number(page?.current) }));
    }
    if (page?.pageSize) {
      setPagination((prev) => ({ ...prev, pageSize: Number(page?.pageSize) }));
    }
  };
  return (
    <div className="p-8" id="modal-root">
      <div className="pb-8">
        <Form className="flex gap-4 w-full" form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} layout="inline">
          <Form.Item name="id" label="id">
            <Input placeholder="请输入" allowClear />
          </Form.Item>
          <Form.Item name="title" label="title">
            <Input placeholder="请输入" allowClear />
          </Form.Item>
          <Form.Item name="content" label="content">
            <Input placeholder="请输入" allowClear />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={onSearch}>
              搜索
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={onAdd}>
              新增
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Table
          dataSource={dataSource}
          loading={tableLoading}
          columns={columns}
          rowKey={(record) => record.id}
          pagination={pagination}
          onChange={onChange}
        />
        ;
      </div>
    </div>
  );
}
